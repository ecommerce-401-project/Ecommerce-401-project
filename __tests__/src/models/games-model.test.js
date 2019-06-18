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
    expect(getId.published).toBe(false);
  });

  it('should only return published games', async () => {
    await game.create({
      name: 'published Game',
      genre: 'published Games',
      creator: 'Publisher',
      published: true,
    });
    await game.create({
      name: 'Not published Game',
      genre: 'Not published Games',
      creator: 'Publisher',
    });

    var result = await game.getAllPublished();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('published Game');
  });
});
