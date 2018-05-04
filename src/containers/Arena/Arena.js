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
    movie: false, //boolean for whether the user should be entering a move (false = enter actor)
    trail: [],
    guess: '',
  }

  guessHandler = () => {
    let guess = this.state.guess;
    console.log(axios)
    // check OMDB for correctness
    // select axios instance based on what we're searching for
    let searchMethod = this.state.movie ? axios.movieSearch : axios.actorSearch;
    searchMethod.get("?api_key="+API_KEY+"&query="+guess)
    // if result ->
    .then(result => {
      console.log(result.data.results[0])
      const response = result.data.results[0];
      // check if this answer is unique -- repeats not allowed
      if (this.state.trail.indexOf(response.title)){
        // answer is a duplicate
      }
    })
    // if no result
    .catch(err => {
      console.log(err)
    })
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
