const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let LocationSchema = new Schema({
	speed: {type: Number, required: false}, 
  heading: {type: Number, required: false},
  accuracy: {type: Number, required: false},
  altitude: {type: Number, required: false},
  longitude: {type: Number, required: false},
  latitude: {type: Number, required: false},
 },{_id: false});

module.exports = LocationSchema;