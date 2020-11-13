const router = require('express').Router(); // requiring the express's Router to create this route of our App
let Exercise = require('../models/exercise.model'); // requiring the mongoose model for user

// READ operation on DB
// Below is the first route i:e first endpoint that handles incoming http get requests on /users URL path
router.route('/').get((req, res) => { //that '/' speaks of root/users/ - if the user is asking for such URL and its a get req
	// then below is bound to happen
	Exercise.find() //find is a mongoose method that gets all the exercises in the mongodb - find method returns a promise
	//A Promise is a proxy for a value not necessarily known when the promise is created
	//after the find then - we are gonna return in a json format - of all the exercises recieved  
		.then(exercises => res.json(exercises))
	//catch is used for posting a error
		.catch(err => res.status(400).json('Error: ' + err));

});

//CREATE operation on DB
// Below is the second route i;e second endpoint that handles incoming http post requests on /exercises URL path
router.route('/add').post((req, res) => { //that '/' speaks of root/users/ - if the user is asking for such URL and its a get req
	
	const username = req.body.username; //username is part of the request body - which we are taking to username variable
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);
	
	const newExercise = new Exercise({
	username,
	description,
	duration,
	date,
	}); //creating a new instance of type Exercise model and assign it to newExercise

	newExercise.save()//save method is utilised to add the newExercise to the DB, after that - Exercise Added! json
		.then(() => res.json('Exercise Added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

//READ operation on DB
// :id is a variable its the objectID created by the MongoID; if we do /exercises/objectID and do a get request
//we will get the just the information of that particular object
router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id) //getting the id from URL directly and searching
		.then(exercise => res.json(exercise))
		.catch(err => res.status(400).json('Error: ' + err));	
});

//DELETE operation on DB
//Delete the object by using objectID
router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id) //getting the id from URL directly and searching
		.then(exercise => res.json('Exercise Deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));	
});

//UPDATE operation on DB
router.route('/update/:id').post((req, res) => {
	Exercise.findById(req.params.id) //getting the id from URL directly and searching
		.then(exercise => {
			exercise.username=req.body.username;
			exercise.description=req.body.description;
			exercise.duration=Number(req.body.duration);
			exercise.date=Date.parse(req.body.date)

			exercise.save()
				.then(() => res.json('Exercise Updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));	
});







module.exports = router; // standard thing for all router files