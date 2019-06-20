'use strict';

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
  static delete(id) {
    return Game.deleteOne({ _id: id });
  }
  //publisher can get own library
  //need to connect game with creator
  static getUnpublishedGameLibrary(id) {
    let unpublishedGames = Game.find( {publisher : id, published: false} );
    return unpublishedGames;
  }

  static getPublishedGameLibrary(id) {
    let publishedGames = Game.find( {publisher : id, published: true} );
    return publishedGames;
  }
}

module.exports = PublisherRepo;