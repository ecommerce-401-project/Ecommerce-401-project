
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
  });
  it('should get game by id', async () => {
    var result = await game.create({
      name: 'Fort Nite',
      genre: 'Battle Royale',
      creator: 'Jacob',
    });

    var getId = await game.getById(result.getId_id);
    expect(getId).toBeDefined();
    expect(result.name).toBe('Fort Nite');
  });
});
