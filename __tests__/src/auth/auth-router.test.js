'use strict';
const supergoose = require('../../supergoose');
const { server } = require('../../../src/app');
const mockrequest = supergoose.server(server);
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('auth router test', () => {
  it('creates a user', async () => {
    await mockrequest
      .post('/signup')
      .send({ username: 'hello World', password: '12345' })
      .expect(200)
      .expect({
        username: 'hello World',
      });
  });
});
