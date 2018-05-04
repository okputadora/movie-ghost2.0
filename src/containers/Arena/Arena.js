import React, { Component } from 'react';
import Avatars from '../../components/Avatars/Avatars';
import classes from './Arena.css';
import Instruction from '../../components/Instruction/Instruction';
import Submission from '../../components/Submission/Submission'
import Trail from '../../components/Trail/Trail'
// import axios from '../../utils/axios'
// import mdb from '../../utils/mdbFunctions'
const API_KEY = process.env.REACT_APP_MDB_KEY;
const mdb = require('moviedb')(API_KEY)

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
    movie: true, //boolean for whether the user should be entering a move (false = enter actor)
    previousCast: [],
    trail: [{name: 'Tom Hanks', year: null, img:null}],
    guess: '',
  }

  guessHandler = () => {
    let guess = this.state.guess;
    // check MDB for correctness
    mdb.searchMovie({query: guess}, (err, res) => {
      this.checkGuess(res.results[0])
    })
    // if result ->
    // .then(result => {
    //   console.log(result.data)
    //   this.checkGuess(result.data.results[0]);
    // })
    // // if no result
    // .catch(err => {
    //   console.log(err)
    // })
  }

  updateGuess = (event) => {
    let currentGuess = this.state.guess;
    currentGuess = event.target.value
    this.setState({
      guess: currentGuess
    })
  }

  checkGuess (response) {
    // get the name of actor or movie
    const name = this.state.movie ? response.title : response.name;
    console.log("NAME<",name)
    // check for uniqueness
    if (this.state.trail.indexOf(name) === -1 && this.state.trail.length > 0 ){
      // check for accuracy -- i.e. is this a movie the prev actor was in?
      let lastEntry = this.state.trail[this.state.trail.length - 1].name;
      // if we're submitting a movie we need to check if the previous
      // actor is in that movie
      if (this.state.movie){
        // get the cast and see if lastEntry is in it
        mdb.movieCredits({id: response.id}, (err, res) => {
          let cast = res.cast.map(elem => elem.name.toLowerCase())
          if (cast.indexOf(lastEntry.toLowerCase()) !== -1){
            console.log("CORRECT ANSWER",name)
            this.updateAfterGuess(name, cast, response.release_date.slice(0,4));
          }
        })
        // omdb.getCast(response.id)
        // .then(response => {
        //   console.log(response)
        // })
        return;
      }
      // if we're submitting an actor we can check state.previousCast
      console.log("loop through actors in prevCast state")
    }
  }
  updateAfterGuess(name, cast, year){
    // update the trail
    let updatedTrail = [...this.state.trail];
    const newItem = {
      name: name,
      year: year,
      image: '',
      previousCast: cast
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
