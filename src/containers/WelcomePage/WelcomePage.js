import React, { Component } from 'react';
import classes from './WelcomePage.css';
import divider from '../../assets/divider.png';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
class WelcomePage extends Component{
  render(){
    return (
    <div className={classes.Welcome}>
      <h2 className={classes.Title}>Start a new game</h2>
      <img src={divider} height="30px"/>
      <div>Enter your name</div>
      <TextInput />
      <div className={classes.Prompt}>Select number of opponents</div>
      <div className={classes.oppOptions}>
        <div className={classes.Opt}>1</div>
        <div className={classes.Opt}>2</div>
      </div>
      <Button>Play</Button>
    </div>
      )

  }
}

export default WelcomePage;
