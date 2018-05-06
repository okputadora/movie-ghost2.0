import React, { Component } from 'react';
import classes from './WelcomePage.css';
import divider from '../../assets/divider.png';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
class WelcomePage extends Component{
  state = {
    username: '',
    oppNo: 1
  }

  updateUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  updateOppNo = (event) => {
    console.log("we good")
    this.setState({
      oppNo: event.target.innerHTML
    })
  }

  render(){
    return (
    <div className={classes.Welcome}>
      <div className={classes.Title}>Start a new game</div>
      <img src={divider} height="30px"/>
      <div>Enter your name</div>
      <TextInput changed={this.updateUsername}/>
      <div className={classes.Prompt}>Select number of opponents</div>
      <div className={classes.oppOptions}>
        <div onClick={this.updateOppNo} className={classes.Opt}>1</div>
        <div onClick={this.updateOppNo} className={classes.Opt}>2</div>
      </div>
      <Button clicked={() => this.props.submitSettings(this.state)}>Play</Button>
      <p className={classes.Text}><em>we recommend playing against two opponents so that you can alternate guessing movies and actors</em></p>
    </div>
      )

  }
}

export default WelcomePage;
