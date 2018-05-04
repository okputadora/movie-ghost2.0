import React, { Component } from 'react';
import Avatars from '../../components/Avatars/Avatars';
import classes from './Arena.css';
import Instruction from '../../components/Instruction/Instruction';
import Submission from '../../components/Submission/Submission'
import Trail from '../../components/Trail/Trail'
import axios from '../../utils/axios'
const API_KEY = process.env.REACT_APP_OMDB_KEY;

class Arena extends Component{
  state = {
    players: [],
    activePlayer: '',
    movie: true, //boolean for whether the user should be entering a move (false = enter actor)
    trail: [],
    guess: '',
    previousGuess: '' // when checking the guess we'll need to use the prevGuess to find possible correct answers
  }

  guessHandler = () => {
    let guess = this.state.guess;
    console.log(guess)
    // check OMDB for correctness
    console.log(axios)
    axios.get("?api_key="+API_KEY+"&query="+guess)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
      // if result ->
      // if correct ->
        // update this.state.activePlayer
        // update this.state.movie
        // update this.state.guess
        // update.this.state.trail
  }

  updateGuess = (event) => {
    console.log(event.target.value)
    let currentGuess = this.state.guess;
    currentGuess = event.target.value
    this.setState({
      guess: currentGuess
    })
  }
  render(){
    return (
      <div className={classes.Arena}>
        <Instruction
          currentTurn="Mike's turn"
          currentInstruction="Enter the name of a movie or an actor"
        />
        <Submission
          guessListener={this.updateGuess}
          guessed={this.guessHandler}/>
        <Avatars />
        <Trail />
      </div>
    )
  }
}

export default Arena;
