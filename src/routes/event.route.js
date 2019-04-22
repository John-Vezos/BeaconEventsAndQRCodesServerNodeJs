const express = require('express');
const router = express.Router();
const Authentication_controller = require('../controllers/Authentication.controller');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const event_controller = require('../controllers/event.controller');


// a simple test url to check that all of our files are communicating correctly.

router.use(Authentication_controller.isAuthenticated);

router.get('/beacon_view', event_controller.beaconView);
router.post('/create_IBeacon', event_controller.createIBeacon);
router.post('/create_Eddystone', event_controller.createEddystone);
router.post('/create_QRScan', event_controller.createQRScan);

module.exports = router;