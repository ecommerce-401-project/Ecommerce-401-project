const supergoose = require('../../supergoose');

const publisher = require('../../../src/models/publisher-repo.js');
const game = require('../../../src/models/games-repo.js');
const admin = require('../../../src/models/admin-repo.js');

describe('Data-modeling', () => {
  beforeAll(supergoose.startDB);
  afterAll(supergoose.stopDB);
  it('should add a new game', async () => {
    var result = await publisher.create({
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
    var result = await publisher.create({
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
    await publisher.create({
      name: 'published Game',
      genre: 'published Games',
      creator: 'Publisher',
      published: true,
    });
    await publisher.create({
      name: 'Not published Game',
      genre: 'Not published Games',
      creator: 'Publisher',
    });

    var result = await game.getAllPublished();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('published Game');
  });

  it('admin approved game to be listed', async () => {
    const approval = await publisher.create({
      name: 'Needs Approval',
      genre: 'Test Games',
      creator: 'Tester',
    });
    await admin.approveGame(approval._id);
    let result = await game.getById(approval._id);
    expect(result.name).toBe('Needs Approval');
    expect(result.published).toBe(true);
  });

  it('can delete game', async () => {
    const newGame = await publisher.create({
      name: 'hi',
      genre: 'Jean',
      creator: 'me',
    });
    expect(newGame).toHaveProperty('_id');

    const deleteResult = await admin.delete(newGame._id);
    expect(deleteResult).toHaveProperty('deletedCount', 1);

    const deletedGame = await game.getById(newGame._id);
    expect(deletedGame).toBe(null);
  });
});
