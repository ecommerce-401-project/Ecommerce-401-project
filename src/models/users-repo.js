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
      return;
    }
    if (user.gameLibrary.includes(gameId)) {
      return;
    } else {
      user.gameLibrary.push(gameId);
      return user.save();
    }
  }
  static getById(id) {
    return User.findById(id);
  }
  static getGameLibrary(id) {
    return User.find(id.gameLibrary);
  }
  static async deleteFromLib(user, gameId) {
    return User.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: { gameLibrary: gameId },
      },
      { new: true, safe: true, useFindAndModify: true }
    );
  }
}

module.exports = UserRepo;
