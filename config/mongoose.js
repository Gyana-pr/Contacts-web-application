// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// aquire connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'error conecting to db'));

// up and running the print message
db.once('open',function(){
    console.log('successfully connected to database');
});