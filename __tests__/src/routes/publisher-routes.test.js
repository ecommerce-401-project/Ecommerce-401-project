'use strict';

const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');

var publisher;
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
beforeAll(async() => {
  publisher = await new User( {
    username: 'asdf',
    password: 'password',
    role: 'publisher',
  }).save();
});
//tell supergoose to stop after all tests. 
afterAll(supergoose.stopDB);
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Publisher Routes', () => {
  it('returns a 200 for a post request', () => {
    return mockRequest
      .post('/games/publisher')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send({name: 'Skylars Game', genre: 'funny', creator: 'something', published: true })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('published', false);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });
  it('deletes a game', async () => {
    var result = await mockRequest
      .post('/games/publisher')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send({
        name: 'Donkey Kong',
        genre: 'Retro',
        creator: 'Nintendo',
      });     
    
    var deleteGame = await mockRequest.delete(`/games/publisher/${result.body._id}`)
      .set('Authorization', `Bearer ${publisher.generateToken()}`);
    expect(deleteGame.status).toBe(200);
    var gametest = await mockRequest
      .get(`/games/${result.body._id}`);
    expect(gametest.data).toBeUndefined();
  });

  it('Saves a game with the publishers id', async () => {
    return await mockRequest
      .post ('/games/publisher')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send ({
        name: 'Borderlands 2',
        genre: 'looter-shooter',
        creator: 'Gearbox',
      })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('publisher', publisher._id);
      });
  });

});