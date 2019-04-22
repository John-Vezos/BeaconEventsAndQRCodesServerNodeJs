const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('./LocationSchema');

let EddystoneSchema = new Schema({
		uuid: {type: String, required: true},
    distance: {type: Number, required: true},

    EddystoneLocation: LocationSchema,
},{_id: false});

// Export the schema
module.exports = EddystoneSchema