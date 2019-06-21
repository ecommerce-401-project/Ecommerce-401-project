'use strict';

// creates games for mongodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const gameSchema = Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  creator: { type: String, required: true },
  imageURL: { type: String },
  releaseDate: { type: Date },
  published: { type: Boolean, default: false },
  publisher: { type: ObjectId, ref: 'users' },
});

// checks if table exists OR create new table
const Game = mongoose.model('games', gameSchema);

// export
module.exports = Game;
