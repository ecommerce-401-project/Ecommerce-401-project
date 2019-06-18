'use strict';
const supergoose = require('../../supergoose');
const { server } = require('../../../src/app');
const mockrequest = supergoose.server(server);
// const User =  require('');
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('auth router test', () => {
  it('creates a user', async () => {
    let result = await mockrequest
      .post('/signup')
      .send({ username: 'hello World', password: '12345' });
    expect(result.body.username).toBe('hello World');

  });
});


