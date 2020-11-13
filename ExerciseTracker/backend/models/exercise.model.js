// A lot of the below looks similar to almost any mongoose schema!!!

const mongoose = require('mongoose'); //we need mongoose


const Schema = mongoose.Schema; 


const exerciseSchema = new Schema({

	//exericseSchema has 4 fields unlike userSchema that has just one field
	username: { type: String,required: true},
	description: { type: String,required: true},
	duration: { type: Number,required: true},
	date: { type: Date,required: true},
		
},{
	timestamps: true, //automatically creates fields for when it is created and modified

});

const Exercise = mongoose.model('Exercise', exerciseSchema); //'User' is just any random name we give to our Schema

module.exports = Exercise;