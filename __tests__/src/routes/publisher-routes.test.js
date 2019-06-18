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
        expect(res.body).toHaveProperty('published', false);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });
  it('deletes a game', async () => {
    var result = await mockRequest
      .post('/games/publisher')
      .send({
        name: 'Donkey Kong',
        genre: 'Retro',
        creator: 'Nintendo',
      });

    console.log('result id', result.body._id);
     
    
    var deleteGame = await mockRequest.delete(`/games/publisher/${result.body._id}`);
    expect(deleteGame.status).toBe(200);
    var gametest = await mockRequest
      .get(`/games/${result.body._id}`);
    expect(gametest.data).toBeUndefined();
  });
});