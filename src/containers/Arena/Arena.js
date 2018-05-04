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
    players: ['mike', 'robot1'],
    activePlayer: 'mike',
    movie: true, //boolean for whether the user should be entering a move (false = enter actor)
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
      this.updateAfterGuess(result.data.results[0]);
    })
    // if no result
    .catch(err => {
      console.log(err)
    })
  }

  updateGuess = (event) => {
    console.log(event.target.value)
    let currentGuess = this.state.guess;
    currentGuess = event.target.value
    this.setState({
      guess: currentGuess
    })
  }

  updateAfterGuess (response) {
    // check for uniqueness
    if (this.state.trail.indexOf(response.title) === -1){
      // update the trail
      let updatedTrail = [...this.state.trail];
      const newItem = {
        title: response.title,
        year: response.release_date.slice(0,4),
        image: response
      }
      updatedTrail.push(newItem)
      // update the current player
      let activeIndex = this.state.players.indexOf(this.state.activePlayer) + 1;
      activeIndex = (activeIndex >= this.state.players.length) ? 0 : activeIndex;
      const updatedActivePlayer = this.state.players[activeIndex]
      this.setState({
        activePlayer: updatedActivePlayer,
        trail: updatedTrail
      })
    }
    // if not unique
  }
  render(){
    const instruction = this.state.movie ? "enter the name of a movie" : "enter the name of an actor";
    const turn = this.state.activePlayer + "'s turn"

    return (
      <div className={classes.Arena}>
        <Instruction
          currentTurn={turn}
          currentInstruction={instruction}
        />
        <Submission
          guessListener={this.updateGuess}
          guessed={this.guessHandler}/>
        <Avatars
          players={this.state.players}
          active={this.state.activePlayer}
        />
        <Trail trail={this.state.trail}/>
      </div>
    )
  }
}

export default Arena;
