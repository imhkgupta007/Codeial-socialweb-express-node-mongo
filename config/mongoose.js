// Require the library
const mongoose = require('mongoose');

const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

// Connect to the database
mongoose.connect('mongodb://localhost/codeial_development');

// Acquire the connection
const db = mongoose.connection;

// Error Case
db.on('error', console.error.bind(console, 'Error in connecting to database'));

// Working Case
db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

// Export Database
module.exports = db;