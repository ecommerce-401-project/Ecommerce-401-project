const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');

//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests.
afterAll(supergoose.stopDB);
//define a mock request to make api calls
const mockRequest = supergoose.server(server);

var publisher;
var publisher2;
describe('Publisher Routes', () => {
  it('returns a 200 for a post request', async () => {
    publisher = await new User({
      username: 'Lily',
      password: '12345678',
      role: 'publisher',
    }).save();

    await mockRequest
      .post('/publisher')
      .set('Authorization', `Bearer ${publisher.generateToken()}`)
      .send({ name: 'Skylars Game', genre: 'funny', creator: 'something' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('published', false);
        expect(res.body).toHaveProperty('name', 'Skylars Game');
      });
  });

  it('deletes a game', async () => {
    publisher2 = await new User({
      username: 'LilyAnn',
      password: '12345678',
      role: 'publisher',
    }).save();

    var result = await mockRequest
      .post('/publisher')
      .set('Authorization', `Bearer ${publisher2.generateToken()}`)
      .send({
        name: 'Donkey Kong',
        genre: 'Retro',
        creator: 'Nintendo',
      });

    console.log('result id', result.body._id);

    expect(result.body).toHaveProperty('_id');
    await mockRequest
      .delete(`/games/${result.body._id}`)
      .set('Authorization', `Bearer ${publisher2.generateToken()}`)
      .expect(200);

    await mockRequest.get(`/games/${result.body._id}`).expect(404);
  });
});
