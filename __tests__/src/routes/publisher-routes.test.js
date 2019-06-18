const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests. 
afterAll(supergoose.stopDB);
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Publisher Routes', () => {
  it('returns a 200 for a post request', () => {
    return mockRequest
      .post('/games/publisher')
      .send({name: 'Skylars Game', genre: 'funny', creator: 'something'})
      .expect(200)
      .expect(res => {
        console.log(res.body);
        expect(res.body).toHaveProperty('approved', false);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });
});