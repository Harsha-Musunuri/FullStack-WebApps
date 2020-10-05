const router = require('express').Router(); // requiring the express's Router to create this route of our App
let User = require('../models/user.model'); // requiring the mongoose model for user


// Below is the first route i:e first endpoint that handles incoming http get requests on /users URL path
router.route('/').get((req, res) => { //that '/' speaks of root/users/ - if the user is asking for such URL and its a get req
	// then below is bound to happen
	User.find() //find is a mongoose method that gets all the users in the mongodb - find method returns a promise
	//A Promise is a proxy for a value not necessarily known when the promise is created
	//after the find then - we are gonna return in a json format - of all the users recieved  
		.then(users => res.json(users))
	//catch is used for posting a error
		.catch(err => res.status(400).json('Error: ' + err));

});


// Below is the second route i;e second endpoint that handles incoming http post requests on /users URL path
router.route('/add').post((req, res) => { //that '/' speaks of root/users/ - if the user is asking for such URL and its a get req
	
	const username = req.body.username; //username is part of the request body - which we are taking to username variable
	
	const newUser = new User({username}); //creating a new instance of type User model and assign it to newUser

	newUser.save()//save method is utilised to add the newUser to the DB, after that - user Added! json
		.then(() => res.json('User Added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router; // standard thing for all router files