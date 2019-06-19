'use strict';
const supergoose = require('../../supergoose');
const UserRepo = require('../../../src/models/users-repo');
const Game = require('../../../src/models/games-schema');
const User = require('../../../src/auth/user-schema');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('the user repo', () => {
  it('can save game to user', async () => {
    //arrange
    let user = new User({
      username: 'michele',
      password: '12345456',
    });
    await user.save();
    console.log(user._id);
    expect(user._id).toBeDefined();
    expect(user.gameLibrary.toObject()).toEqual([]);
    
    let game = new Game({
      name: 'Mario', 
      creator: 'Nintendo',
      genre: 'Retro',
    });


    await game.save();
    expect(game._id).toBeDefined();
    //act 
    await UserRepo.saveGame(user, game);
    //assert
    expect(user.gameLibrary.toObject()).not.toEqual([]);
    let newuser = await UserRepo.getById(user._id);
    console.log(newuser.gameLibrary.toObject());
    expect(newuser.gameLibrary.toObject()).toEqual([game._id]);
  });
});






