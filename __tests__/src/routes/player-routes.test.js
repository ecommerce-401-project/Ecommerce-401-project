'use strict';
const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');

let user = new User({
  username: 'HelloWorld',
  password: 'something',
  role: 'player',
});

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const mockRequest = supergoose.server(server);

describe('Player Routes', () => {
  beforeAll(() => user.save());
  it('returns a 200 for a defined route', () => {
    return mockRequest.get('/games').expect(200);
  });
  it('returns a 404 for an undefined route', () => {
    return mockRequest.get('/unknownroute').expect(404);
  });
  it.skip('returns a 404 a bad id', async () => {
    return await mockRequest
      .post('/games/5d0a81ca46jjhjhj9009235bd7fabc/save')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(404);
  });
});
