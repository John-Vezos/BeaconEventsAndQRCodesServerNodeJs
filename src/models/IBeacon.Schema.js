const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('./LocationSchema');

let IBeaconSchema = new Schema({
    uuid: {type: String, required: true},
    major: {type: Number, required: true},
    minor: {type: Number, required: true},

    IBeaconLocation: LocationSchema,
    
},{_id: false});

// Export the Schema
module.exports = IBeaconSchema