'use strict';
const User = require('../../src/auth/user-schema');
const Game = require('../../src/models/games-schema');

class UserRepo {
  static async saveGame(user, gameId) {
    if (!gameId || gameId.toString().length !== 24) {
      return;
    }
    let game = await Game.findById(gameId);
    console.log(game);
    if (!game) {
      return;
    } else {
      user.gameLibrary.push(gameId);
      return user.save();
    }
  }
  static getById(id) {
    return User.findById(id);
  }
}

module.exports = UserRepo;
