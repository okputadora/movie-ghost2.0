import React, { Component } from 'react';
import classes from './WelcomePage.css';
import divider from '../../assets/divider.png';
import TextInput from '../../components/UI/TextInput/TextInput';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxil'

import api from '../../utils/api/api';

class WelcomePage extends Component{
  state = {
    username: '',
    password: '',
    loggedIn: false,
    error: '',
    modal: false
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
      if (response.confirmation === 'fail'){
        console.log(response.message)
        return this.setState({
          error: response.message,
          modal: true
        })
      }
      console.log(response)
    })
  }

  closeModal = () => {
    this.setState({
      error: '',
      modal: false,
      username: '',
      password: ''
    })
  }

  render(){
    let modal;
    if (this.state.error){
      modal = <Modal show={this.state.modal} closeModal={this.closeModal}>{this.state.error},</Modal>
    }
    return (
      <Aux>
        <div>{modal}</div>
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
      </Aux>
    )
  }
}

export default WelcomePage;
