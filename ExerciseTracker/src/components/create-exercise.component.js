import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props){
        super(props);

        //binding the this keyword to the class CreateExercises
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [] //as the front end of this page has the dropdown menu of users to choose from

        }
    }


  //React's life cycle methods that will be automatically called at different points. 
  //DidMount() method will be called before anything is displayed on the screen  
  componentDidMount()
  {
   axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0)
            {
                this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username

                    })
            }
        })
  }  
   //methods to update the state properties like the username, description, etc.
   //this method is going to be called when the user enters the username in the textbox. and the e.target is the textbox
  onChangeUsername(e)
  {
      this.setState({
          username: e.target.value
      });
  }  
  onChangeDescription(e)
  {
      this.setState({
          description: e.target.value
      });
  }
  onChangeDuration(e)
  {
      this.setState({
          duration: e.target.value
      });
  }
  // A library is used to show the calendar on the web page, user chooses the date on the calendar
  onChangeDate(date)
  {
      this.setState({
          date: date
      });
  }


  //Handling the submit event on the form - form will be there at the end of these
  onSubmit(e)
  {
      e.preventDefault();

      const exercise = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date
      }
      console.log(exercise);
      axios.post('http://localhost:5000/exercises/add', exercise) //it's a promise, see that it looks similar to Insomnia
        .then(res => console.log(res.data)); //either exercise added! or error 400 will be shown cuz thats the response server gives to front end!
      

      window.location = '/' /* this is to move the user back to home page - to see the list of exercises */
      

  }
  
    render() {
        return(
            <div>
                {/* <p>You are on the Create Exercises component!</p> */}
                {/* Below is our form */}
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}> 
                {/* when someone submits the form - call onSubmit method; */}
                <div>
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            // gets the users from mongoDB and shows as a option of the select box 
                            this.state.users.map(function(user) {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                {/* Description is a standard text box, that takes input and calls onChangeDescription method */}
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                </div>
                {/* Duration is a standard input box */}
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        {/* Datepicker is a component - the calendar thingy - can be installed via npm install react-datepicker */}
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}