import React, { Component } from 'react';
import classes from './WelcomePage.css';
import divider from '../../assets/divider.png';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';

import api from '../../utils/api/api';

class WelcomePage extends Component{
  state = {
    username: '',
    password: ''
  }

  updateUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  loginHandler = () => {
    console.log("Loggin in")
    api.newUser({username: this.state.username, password: this.state.password})
    .then(response => {
      console.log(response)
    })
  }

  render(){
    return (
      <div className={classes.Welcome}>
        <div className={classes.Login}>
          <h2 className={classes.Title}>Login / Signup</h2>
          <TextInput changed={this.updateUsername} placeHolder="username" />
          <TextInput changed={this.updatePassword} placeHolder="password" inputType="password"/>
          <Button clicked={this.loginHandler}>submit</Button>
        </div>
        <p className={classes.Text}><em>Creating an account allows you to save and submit your high
        score to the leaderboard. We do not and will not ask for or save personal information.</em></p>
      </div>
      )

  }
}

export default WelcomePage;
