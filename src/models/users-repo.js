'use strict';
const User= require('../../src/auth/user-schema');

class UserRepo {
  static saveGame(user, game) {
    user.gameLibrary.push(game);
    return user.save();
  }
  static getById(id) {
    return User.findById(id);
  }
}

module.exports = UserRepo;