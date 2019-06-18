const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests. 
afterAll(supergoose.stopDB);
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Game Routes', () => {
  it('returns a 200 for a defined route', () => {
    return mockRequest.get('/games').expect(200);
  });
  it('returns a 404 for an undefined route', () => {
    return mockRequest.get('/unknownroute').expect(404);
  });
  it('returns a 404 for a bad post request', () => {
    return mockRequest
      .post('/someRoute')
      .send({name: 'Skylars Game', genre: 'funny',  creator: 'something'})
      .expect(404);
  });
  it('returns a 200 for a post request', () => {
    return mockRequest
      .post('/games')
      .send({name: 'Skylars Game', genre: 'funny', creator: 'something'})
      .expect(200)
      .expect(res => {
        console.log(res.body);
        expect(res.body).toHaveProperty('approved', false);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });
});