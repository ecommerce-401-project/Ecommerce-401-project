const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const game = require('../../../src/models/games-repo');
const User = require('../../../src/auth/user-schema');
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests.
afterAll(supergoose.stopDB);
//define a mock request to make api calls
const mockRequest = supergoose.server(server);

var admin;
var admin2;
describe('Admin Routes', () => {
  it('it gives back all items', async () => {
    admin = await new User({
      username: 'Lily',
      password: '12345678',
      role: 'admin',
    }).save();

    await game.create({
      name: 'Pac Man',
      genre: 'Retro',
      creator: 'Skylar',
    });
    await game.create({
      name: 'Pac Man',
      genre: 'Retro',
      creator: 'Skylar',
      published: true,
    });

    let response = await mockRequest
      .get('/admin')
      .set('Authorization', `Bearer ${admin.generateToken()}`);
    expect(response.body.count).toBe(2);
    expect(response.status).toBe(200);
    // expect(admin.body)
  });

  it('admin should be able to delete game', async () => {
    admin2 = await new User({
      username: 'Lily2',
      password: '12345678',
      role: 'admin',
    }).save();

    let result = await game.create({
      name: 'big Man',
      genre: 'Family',
      creator: 'Fizbuzzer',
    });

    let deleteGame = await mockRequest
      .delete(`/admin/delete-game/${result._id}`)
      .set('Authorization', `Bearer ${admin2.generateToken()}`)
      .expect(200);
    expect(deleteGame.body.data)
      .toBeUndefined();
  });
});
