import React, { Component } from 'react';
import classes from './Account.css'
import api from '../../utils/api/api'
// import divider from '../../assets/divider.png';


class Account extends Component{

  componentDidMount(){
    console.log('mounted')
    // load account info from the session id
    api.getUserInfo()
    .then(response => console.log(response))
  }

  render(){
    return(
      <div>
        Account
      </div>
    )
  }
}

export default Account;
