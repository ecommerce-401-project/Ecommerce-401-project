'use strict';

const User = require('../auth/user-schema');
const Game = require('./games-schema');


//see all my unpublished 
//see all my published games 
class PublisherRepo {
  //publisher can create a new game
  static create(game) {
    let newGame = new Game(game);
    return newGame.save();
  }
  //publisher can delete own game
  static delete(_id) {
    return Game.deleteOne({ _id });
  }
  //publisher can get own library
  //need to connect game with creator
  static getGameLibrary(id) {
    return User.find(id.creator);
  }
}

module.exports = PublisherRepo;