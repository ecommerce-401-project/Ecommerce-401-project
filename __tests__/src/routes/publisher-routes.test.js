'use strict';

const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');

var publisher;
var admin;
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
beforeAll(async() => {
  publisher = await new User( {
    username: 'asdf',
    password: 'password',
    role: 'publisher',
  }).save();
});
beforeAll(async() => {
  admin = await new User( {
    username: 'admin',
    password: 'password',
    role: 'admin',
  }).save();
});
//tell supergoose to stop after all tests. 
afterAll(() => {
  supergoose.stopDB;
});
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Publisher Routes', () => {

  afterAll(() => setTimeout(5000));
  
  it('returns a 200 for a post request', () => {
    return mockRequest
      .post('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send({name: 'Skylars Game', genre: 'funny', creator: 'something', published: true })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('published', true);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });

  it('Can delete a publishers own game', async () => {
    var result = await mockRequest
      .post('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send({
        name: 'Donkey Kong',
        genre: 'Retro',
        creator: 'Nintendo',
      });     
    
    expect(result.body).toHaveProperty('_id');
    await mockRequest
      .delete(`/games/${result.body._id}`)
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .expect(204);

    await mockRequest.get(`/games/${result.body._id}`).expect(404);
  });

  it('Saves a game with the publishers id', async () => {
    let response = await mockRequest
      .post ('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send ({
        name: 'Borderlands 2',
        genre: 'looter-shooter',
        creator: 'Gearbox',
      })
      .expect(200);
    expect(response.body.publisher.toString()).toBe(publisher._id.toString());
  });

  // Skip while games are auto-published
  it.skip('Can find all of a publishers own unpublished games', async () => {
    await mockRequest
      .post('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send ({
        name: 'Paladins',
        genre: 'Hero shooter',
        creator: 'Hi-Rez',
      })
      .expect(200);
    await mockRequest
      .post('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send ({
        name: 'Celeste',
        genre: 'Precision platformer',
        creator: 'MattMakesGames',
      })
      .expect(200);
    await mockRequest
      .get(`/publisher/games/unpublished`)
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[2]).toHaveProperty('name', 'Paladins');
        expect(res.body[3]).toHaveProperty('name', 'Celeste');
      });
  });

  // Skip while games are auto-published
  it.skip('Can find all of a publishers own published games', async () => {
    let approvedGame = await mockRequest
      .post('/games')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send ({
        name: 'Battleborn',
        genre: 'Hero shooter',
        creator: 'Gearbox',
      })
      .expect(200)
      .then(response => response.body);
    expect(approvedGame).toHaveProperty('_id');

    await mockRequest
      .post(`/admin/approve-game/${approvedGame._id}`)
      .set('Authorization', `Bearer ${admin.generateToken()}`)
      .expect(200);

    await mockRequest
      .get(`/publisher/games/published`)
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('name', 'Battleborn');
      });
  });
});
