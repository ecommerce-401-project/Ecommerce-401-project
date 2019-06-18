'use strict';

// schema creation
const mongoose = require('mongoose');
const gameSchema = mongoose.Schema({ 
  name: {type: String, required:true},
  genre: {type: String, required:true},
  description: {type: String},
  creator: {type: String, required:true},
  imageURL: {type: String},
  releaseDate: {type: Date},
  published: {type: Boolean, default: false},
});

// checks if table exists OR create new table
const Game = mongoose.models.game || mongoose.model('game', gameSchema);

// export
module.exports = Game;



