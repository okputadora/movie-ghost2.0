import React, { Component } from 'react';
import classes from './Account.css'
import api from '../../utils/api/api'

import Avatar from '../../components/Avatars/Avatar/Avatar'
// import divider from '../../assets/divider.png';


class Account extends Component{
  state = {
    username: '',
    highScore: '',
    savedTrails: []
  }

  componentDidMount(){
    console.log('mounted')
    // load account info from the session id
    api.getUserInfo()
    .then(response => {
      console.log(response)
      this.setState({
        username: response.username
      })
    })
  }

  render(){
    // let trail
    // if (this.state.savedTrails.length === 0){
    //   trail = "You have not saved any trails yet"
    // }
    return(
      <div>
        <h3 className={classes.Header}>Account Info</h3>
        <div className={classes.Info}>
          <Avatar active/>
          <div className={classes.Details}>
            <div><strong>username: </strong><span>{this.state.username}</span></div>
            <div><strong>High Score: </strong><span>{this.state.highScore}</span></div>
          </div>
        </div>
        <div className={classes.Trails}>
          <h3 className={classes.Header}>Saved Trails</h3>
        </div>
      </div>
    )
  }
}

export default Account;
