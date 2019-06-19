const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');
const game = require('../../../src/models/games-repo');
//tell supergoose to start the database before all tests
beforeAll(supergoose.startDB);
//tell supergoose to stop after all tests. 
afterAll(supergoose.stopDB);
//define a mock request to make api calls 
const mockRequest = supergoose.server(server);

describe('Admin Routes', () => {
  
  it('it gives back all items', async() => {
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
    
    let response = await mockRequest.get('/admin');
    expect(response.body.count).toBe(2);
    expect(response.status).toBe(200);
    // expect(admin.body)
  });

  it('admin should be able to delete game', async() => {
    let result = await game.create({
      name: 'big Man',
      genre: 'Family',
      creator: 'Fizbuzzer',
    });

    let deleteGame= await mockRequest.delete(`/admin/delete-game/${result._id}`);
    expect(deleteGame.body.data).toBeUndefined();
    expect(deleteGame.status).toBe(200);
  });
   
});
