//require the library
const mongoose=require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection
const db=mongoose.connection;

//check for error on connection
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function()
{
    console.log('successfully connected to database');
});
