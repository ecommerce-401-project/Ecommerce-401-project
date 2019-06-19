'use strict';

const Game = require('./games-schema');

// methods to be called in various routes
// TODO: STILL NEED MORE METHODS:
// getowngames
// savetoownlibrary
// deleteowngame

class GameRepository {
  static getAllPublished() {
    return Game.find({ published: true });
  }
  static getAllUnPublished() {
    return Game.find({ published: false });
  }
  static getAll() {
    return Game.find();
  }
  static getById(_id) {
    return Game.findById(_id);
  }
  static create(game) {
    let newGame = new Game(game);
    return newGame.save();
  }
  static async update(_id, game) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, game);
    return await gameToUpdate.save();
  }
  static delete(_id) {
    return Game.deleteOne({ _id });
  }
  // saveGame(){
  //   game.update(
  //     { _id: game._id },
  //     { $push: { games: {name: "Paperboy", creator: "nintendo", genre: "funny"} } },
  // );
}

module.exports = GameRepository;
