'use strict';

const Game = require('./games-schema');

class GameRepository {
  getAll() {
    return Promise.resolve(Game.find());
  }
  async getById(_id) {
    return await Game.find(_id);
  }
  create(game) {
    let newGame = new Game(game); 
    return newGame.save();
  } 
  async update(_id, entry) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, entry);
    return await gameToUpdate.save();
  }
  delete(_id) {
    return Game.deleteOne({ _id });
  }
}

module.exports = GameRepository;