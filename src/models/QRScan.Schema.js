const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('./LocationSchema');

let QRScanSchema = new Schema({
		QRData: {type: String, required: true},

		QRLocation: LocationSchema,
},{_id: false});

// Export the Schema
module.exports = QRScanSchema