import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props){
        super(props);

        //binding the this keyword to the class CreateExercises
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',

        }
    }
    onChangeUsername(e)
  {
      this.setState({
          username: e.target.value
      });
  }  
  //Handling the submit event on the form - form will be there at the end of these
  onSubmit(e)
  {
      e.preventDefault();

      const user = {
          username: this.state.username,
      }
      console.log(user);
      axios.post('http://localhost:5000/users/add', user) //it's a promise, see that it looks similar to Insomnia
        .then(res => console.log(res.data));//either exercise added! or error 400 will be shown cuz thats the response server gives to front end!
      

      this.setState({
          username: ''
      })
      

  }
    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}