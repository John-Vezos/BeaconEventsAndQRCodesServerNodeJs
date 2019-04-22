const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IBeacon = require('./IBeacon.Schema');
const Eddystone = require('./Eddystone.Schema');
const QRScan = require('./QRScan.Schema');



let UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	IBeacon: [IBeacon],
	Eddystone: [Eddystone],
  QRScan: [QRScan],
});

// Export the model
module.exports = mongoose.model('User', UserSchema);