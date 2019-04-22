const IBeacon = require('../models/IBeacon.Schema');
const Eddystone = require('../models/Eddystone.Schema');
const QRScan = require('../models/QRScan.Schema');
const User = require('../models/User.model');

//Simple version, without validation or sanitation
exports.beaconView = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.createIBeacon = function (req, res, next) {

    User.findById(res.userID).exec().then(function(user) {
        user.IBeacon.push({
            uuid: req.body.uuid,
            major: req.body.major,
            minor: req.body.minor,
            IBeaconLocation: {}
        });
        


        // altitude? position : nothing
        if (req.body.altitude) position(user.IBeacon[ (user.IBeacon.length) - 1 ].IBeaconLocation, req);
        
    

        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('IBeacon Created successfully')
        })
    });
};


exports.createEddystone = function (req, res, next) {
        
    User.findById(res.userID).exec().then(function(user) {
        user.Eddystone.push({
            uuid: req.body.uuid,
            distance: req.body.distance,
            EddystoneLocation: {}
        });
        


        // altitude? position : nothing
        if (req.body.altitude) position(user.Eddystone[ (user.Eddystone.length) - 1 ].EddystoneLocation, req);
    

        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Eddystone Created successfully')
        })
    });
};


exports.createQRScan = function (req, res, next) {
    
    User.findById(res.userID).exec().then(function(user) {
        user.QRScan.push({
            QRData: req.body.QRData,
            QRLocation: {},
        });

        
        // altitude? position : nothing
        if (req.body.altitude) position(user.QRScan[ (user.QRScan.length) - 1 ].QRLocation, req);
    

        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Eddystone Created successfully')
        })
    });
};



function position(eventLocation, req) {
    eventLocation.set({
        speed: req.body.speed, 
        heading: req.body.heading,
        accuracy: req.body.accuracy,
        altitude: req.body.altitude,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });
        
}

