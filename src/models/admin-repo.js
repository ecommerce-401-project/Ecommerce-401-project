'use strict';

// const User = require('../auth/user-schema');
const Game = require('./games-schema');


class AdminRepo {
  static getAllUnPublished() {
    return Game.find({ published: false });
  }
  static getAll() {
    return Game.find();
  }

  static delete(_id) {
    return Game.deleteOne({ _id });
  }
  
  static approveGame(id) {
    return Game.update({
      _id: id,
      published: false,
    }, {
      $set: { published: true },
    });
  }
}
module.exports= AdminRepo;