'use strict';
const supergoose = require('../../supergoose');
const UserRepo = require('../../../src/models/users-repo');
const Game = require('../../../src/models/games-schema');
const User = require('../../../src/auth/user-schema');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

let user = new User({
  username: 'michele',
  password: '12345456',
});
let game = new Game({
  name: 'Mario',
  creator: 'Nintendo',
  genre: 'Retro',
});

beforeAll(async () => {
  await user.save();
  expect(user._id).toBeDefined();
  await game.save();
  expect(game._id).toBeDefined();
});

describe('the user repo', () => {
  it('can save game to user', async () => {
    //arrange
    expect(user.gameLibrary.toObject()).toEqual([]);

    //act
    await UserRepo.saveGame(user, game._id);

    //assert
    expect(user.gameLibrary.toObject()).toEqual([game._id]);

    // Make sure getting user includes new game
    let newuser = await UserRepo.getById(user._id);
    expect(newuser.gameLibrary.toObject()).toEqual([game._id]);
  });

  it('does not add game to user for id that is invalid', async () => {
    //act
    await UserRepo.saveGame(user, 'deadbeefdeadbeefdead');

    //assert
    expect(user.gameLibrary.toObject()).toEqual([game._id]);

    // Make sure getting user does not include missing game
    let newuser = await UserRepo.getById(user._id);
    expect(newuser.gameLibrary.toObject()).toEqual([game._id]);
  });

  it('does not add game to user for id that is not found', async () => {
    //act
    await UserRepo.saveGame(user, 'deadbeefdeadbeefdeadbeef');

    //assert
    expect(user.gameLibrary.toObject()).toEqual([game._id]);

    // Make sure getting user does not include missing game
    let newuser = await UserRepo.getById(user._id);
    expect(newuser.gameLibrary.toObject()).toEqual([game._id]);
  });
  it('does not add game to user for id that is not found', async () => {
    //act
    await UserRepo.saveGame(user, null);

    //assert
    expect(user.gameLibrary.toObject()).toEqual([game._id]);

    // Make sure getting user does not include missing game
    let newuser = await UserRepo.getById(user._id);
    expect(newuser.gameLibrary.toObject()).toEqual([game._id]);
  });
});