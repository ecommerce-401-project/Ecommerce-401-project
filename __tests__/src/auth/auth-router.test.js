'use strict';
const supergoose = require('../../supergoose');
const { server } = require('../../../src/app');
const mockrequest = supergoose.server(server);
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('auth router test', () => {

  afterAll(() => setTimeout(5000));
  
  it('creates a user', async () => {
    await mockrequest
      .post('/signup')
      .send({ username: 'hello World', password: '12345' })
      .expect(200)
      .expect({
        username: 'hello World',
      });
  });
  
  it('can\'t sign in without being authenticate', async () => {
    const token = 123456789;
    await mockrequest
      .post('/signin')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });

  it('can sign in with valid username and password', async () => {
    await mockrequest
      .post('/signin')
      .auth('hello World', '12345')
      .expect(200);
  });
});