'use strict';

const Game = require('./games-schema');

class GameRepository {
  //only returns games that have been approved
  getAllPublished() {
    return Promise.resolve(Game.find({ approved: true }));
  }
  //use find with the param id to return specific thing
  async getById(_id) {
    return await Game.findById(_id);
  }
  //takes in the game param which is going to be a json object to create a new game
  create(game) {
    let newGame = new Game(game);
    return newGame.save();
  }
  async update(_id, entry) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, entry);
    return await gameToUpdate.save();
  }
  async delete(_id) {
    return await Game.deleteOne({ _id });
  }
}

module.exports = GameRepository;
