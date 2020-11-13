// Ask for what all you need
const express = require('express');
// const bodyParser = require('bodyParser'); Seems we dont need this in the new version of express - because it is included in it
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config(); // helps to put our env variables in a .env file

// below two lines of code is used to create the express server
const app = express();
const port = process.env.PORT || 5000; //5000 is the port on which server is on

// code piece to connect to MongoDB Atlas
const uri = process.env.ATLAS_URI //uri - we get it from mongoDB dashboard! btw, ATLAS_URI is a env variable set in .env file - go check it!
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true}); 
//these arguments in connect() are something to do with new mongo-node interface updates, nevermind!
const connection = mongoose.connection;

// Once the connection is made open between our server and the mongoDB - below message is logged!
connection.once('open', () => {
	console.log(`MongoDB connection established successfully!!`);
})



app.use(cors()); //cors middleware
app.use(express.json()); //used to parse json - as the server be sending and receiving json


//require the routes files for exercises and users
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
//use the above asked files!!
// Basically., if someone adds /exercises in the base URL of our app, everything in the exerciseRouter will be displayed!
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})



