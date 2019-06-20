const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const publisher = require('../../../src/models/publisher-repo');
const User = require('../../../src/auth/user-schema');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const mockRequest = supergoose.server(server);

var adminUser;
var adminUser2;
describe('Admin Routes', () => {
  it('it gives back all items', async () => {
    adminUser = await new User({
      username: 'Lily',
      password: '12345678',
      role: 'admin',
    }).save();

    await publisher.create({
      name: 'Pac Man',
      genre: 'Retro',
      creator: 'Skylar',
    });
    await publisher.create({
      name: 'Pac Man',
      genre: 'Retro',
      creator: 'Skylar',
      published: true,
    });

    let response = await mockRequest
      .get('/admin')
      .set('Authorization', `Bearer ${adminUser.generateToken()}`);
    expect(response.body.count).toBe(2);
    expect(response.status).toBe(200);
    // expect(admin.body)
  });

  it('admin should be able to delete game', async () => {
    adminUser2 = await new User({
      username: 'Lily2',
      password: '12345678',
      role: 'admin',
    }).save();

    let result = await publisher.create({
      name: 'big Man',
      genre: 'Family',
      creator: 'Fizbuzzer',
    });

    let deleteGame = await mockRequest
      .delete(`/admin/delete-game/${result._id}`)
      .set('Authorization', `Bearer ${adminUser2.generateToken()}`)
      .expect(200);
    expect(deleteGame.body.data).toBeUndefined();
  });
});
