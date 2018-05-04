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
    players: [
      {
        name: 'mike',
        human: true,
        letters: '',
      },
      {
        name:'robot1',
        human: false,
        letters: '',
      }
    ],
    activePlayer: {
      name: 'mike',
      human: true,
    },
    movie: false, //boolean for whether the user should be entering a move (false = enter actor)
    trail: [{name: 'it', year: '2017', img:null}],
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
      const players = this.state.players.map(player => (player.name));
      let activeIndex = players.indexOf(this.state.activePlayer.name) + 1;
      activeIndex = (activeIndex >= this.state.players.length) ? 0 : activeIndex;
      const updatedActivePlayer = this.state.players[activeIndex];
      // update movie or actor for next search
      const acceptingMovie = this.state.movie ? false : true;
      // update state
      this.setState({
        activePlayer: updatedActivePlayer,
        trail: updatedTrail,
        movie: acceptingMovie,
        guess: ''
      })
    }
    // if not unique
  }
  render(){
    console.log()
    return (
      <div className = {classes.Arena}>
        <Instruction
          lastEntry = {this.state.trail[this.state.trail.length - 1]}
          activePlayer = {this.state.activePlayer.name}
          acceptingMovie = {this.state.movie}
        />
        <Submission
          humanPlayer = {this.state.activePlayer.human}
          guessListener = {this.updateGuess}
          guessed = {this.guessHandler}
        />
        <Avatars
          players = {this.state.players}
          active = {this.state.activePlayer}
        />
        <Trail trail = {this.state.trail}/>
      </div>
    )
  }
}

export default Arena;
