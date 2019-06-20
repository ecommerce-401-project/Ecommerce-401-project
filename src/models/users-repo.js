'use strict';
const User = require('../../src/auth/user-schema');
const Game = require('../../src/models/games-schema');
//user can save a game to lib
//user can get own library
class UserRepo {
  static async saveGame(user, gameId) {
    if (!gameId || gameId.toString().length !== 24) {
      return;
    }
    let game = await Game.findById(gameId);
    if (!game) {
      console.log(gameId + ' not found!');
      return;
    }
    if (user.gameLibrary.includes(gameId)) {
      return;
    } else {
      user.gameLibrary.push(gameId);
      console.log(user.gameLibrary);
      return user.save();
    }
  }
  static getById(id) {
    return User.findById(id);
  }
  static getGameLibrary(id) {
    return User.find(id.gameLibrary);
  }
}

module.exports = UserRepo;
