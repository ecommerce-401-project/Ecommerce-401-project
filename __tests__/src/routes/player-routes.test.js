'use strict';
const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');
const Game = require('../../../src/models/games-schema');

let user = new User({
  username: 'HelloWorld',
  password: 'something',
  role: 'player',
});
let game = new Game({
  name: 'Solitaire',
  creator: 'Microsoft',
  genre: 'Boring',
  published: true,
});

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

beforeAll(() => game.save());

const mockRequest = supergoose.server(server);

describe('Player Routes', () => {

  beforeAll(() => user.save());
  afterAll(() => setTimeout(5000));

  it('returns a 200 for a defined route', async () => {
    return await mockRequest.get('/games').expect(200);
  });

  it('returns a 404 for an undefined route', async () => {
    return await mockRequest.get('/unknownroute').expect(404);
  });

  it('returns a 404 a bad id', async () => {
    return await mockRequest
      .post('/games/56jjhbd7fabc/save')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(404);
  });

  it('deletes a game from a users library', async () => {
    let token = user.generateToken();
    await mockRequest
      .post(`/games/${game._id}/save`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    await mockRequest
      .get('/library')
      .set('Authorization', `Bearer ${token}`)
      .expect(res =>{
        expect(res.body).not.toEqual([]);
      });
    await mockRequest
      .delete(`/library/${game._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    return await mockRequest
      .get('/library')
      .set('Authorization', `Bearer ${token}`)
      .expect([]);
  });
});