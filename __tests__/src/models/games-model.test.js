const supergoose = require('../../supergoose');
const GameRepo = require('../../../src/models/games-model.js');
const game = new GameRepo();
describe('Data-modeling', () => {
  beforeAll(supergoose.startDB);
  afterAll(supergoose.stopDB);
  it('should add a new game', async () => {
    var result = await game.create({
      name: 'Pac Man',
      genre: 'Retro',
      creator: 'Skylar',
    });
    expect(result).toBeDefined();
    expect(result.name).toBe('Pac Man');
    expect(result._id).toBeDefined();
    expect(result._id).toBeDefined();
  });
  it('should get game by id', async () => {
    var result = await game.create({
      name: 'Fort Nite',
      genre: 'Battle Royale',
      creator: 'Jacob',
    });

    var getId = await game.getById(result._id);
    expect(getId).toBeDefined();
    expect(getId.name).toBe('Fort Nite');
    expect(getId.approved).toBe(false);
  });

  it('should only return approved games', async () => {
    await game.create({
      name: 'Approved Game',
      genre: 'Approved Games',
      creator: 'Publisher',
      approved: true,
    });
    await game.create({
      name: 'Not Approved Game',
      genre: 'Not Approved Games',
      creator: 'Publisher',
    });

    var result = await game.getAllPublished();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Approved Game');
  });
});
