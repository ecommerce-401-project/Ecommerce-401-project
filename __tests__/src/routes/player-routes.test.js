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
  it('returns a 200 for a defined route', () => {
    return mockRequest.get('/games').expect(200);
  });
  it('returns a 404 for an undefined route', () => {
    return mockRequest.get('/unknownroute').expect(404);
  });
  it('returns a 404 a bad id', async () => {
    return await mockRequest
      .post('/games/56jjhbd7fabc/save')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(404);
  });
  it('can save and retrieve game', async () => {
    await mockRequest
      .post(`/games/${game._id}/save`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(204);

    let library = await mockRequest
      .get('/library')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(200);

    expect(library.body).toHaveProperty('length', 1);
    expect(library.body[0]).toHaveProperty('_id', game._id.toString());
  });
});
