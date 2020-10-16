const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MoneyTime');
console.log( 'connected to DB' );

const app = express();

// Middleware
app.use( morgan('dev') );
app.use( bodyParser.json() );

// Routes
app.use( '/user', require('./routes/users'));

// Start Server
const port = process.env.PORT || 3000;
app.listen( port );
console.log( `Server Listening at ${port}` );