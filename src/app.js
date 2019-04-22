//app.js
const express = require('express');
const bodyParser = require('body-parser');
const event = require('./routes/event.route'); // Imports routes for the events
const user = require('./routes/user.route');   // Imports routes for the users

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = 'mongodb+srv://dbPraktikhs2:12345@praktikh-rbkcu.mongodb.net/test';
let dev_db_url = 'mongodb+srv://dbPraktikhs:12345@cluster1-xptq1.mongodb.net/praktikh';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/events', event);
app.use('/users', user);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});