const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests. 
afterAll(supergoose.stopDB);
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Player Routes', () => {
  it('returns a 200 for a defined route', () => {
    return mockRequest.get('/games').expect(200);
  });
  it('returns a 404 for an undefined route', () => {
    return mockRequest.get('/unknownroute').expect(404);
  });
});