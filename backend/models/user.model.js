// A lot of the below looks similar to almost any mongoose schema!!!

const mongoose = require('mongoose'); //we need mongoose


const Schema = mongoose.Schema; 


const userSchema = new Schema({

	//username is the only field of the userSchema with some rules like required, trim(that removes the white space typed at the end unknowinlgy!), etc.
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3

	},
},{
	timestamps: true, //automatically creates fields for when it is created and modified

});

const User = mongoose.model('User', userSchema); //'User' is just any random name we give to our Schema

module.exports = User;