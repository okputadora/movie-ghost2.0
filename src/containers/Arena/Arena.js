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
    movie: false, //boolean for whether the user should be entering a move (false = enter actor)
    previousCast: ["tom hanks"],
    trail: [{name: 'Forrest Gump', year: "1994", img:null}],
    guess: '',
  }

  componentDidUpdate(){
    // if its a robots turn
    if (!this.state.activePlayer.human){
      // wait a little bit for a better UX
      setTimeout(this.robotGuess, 1000)
    }
  }

  updateGuess = (event) => {
    let currentGuess = this.state.guess;
    currentGuess = event.target.value;
    this.setState({
      guess: currentGuess
    })
  }

  guessHandler = () => {
    let guess = this.state.guess;
    // check MDB to see if the guess is a real movie
    if (this.state.movie){
      mdb.searchMovie({query: guess}, (err, res) => {
        return this.checkGuess(res.results[0])
      })
    }
    return this.checkGuess(guess)
  }

  robotGuess = () => {
    // if the robots picking an actor
    if (!this.state.movie){
      // go through previousCast and find one not played yet
      let duplicate;
      for (let i = 0; i < this.state.previousCast.length; i++){
        let actor = this.state.previousCast[i];
        duplicate = false;
        for (let x = 0; x < this.state.trail.length; x++){
          let prevEntry = this.state.trail[x].name;
          console.log(actor, prevEntry)
          if (actor.toLowerCase() === prevEntry.toLowerCase()){
            duplicate = true
            break;
          }
        }
        if (!duplicate){
          console.log(actor)
          this.updateAfterCorrectGuess(actor)
          break;
        }
      }
    }
    // if the robot is picking a movie
    
  }
  checkGuess (response) {
    // get the name of actor or movie
    const name = this.state.movie ? response.title : response;
    // check for uniqueness
    if (this.state.trail.indexOf(name) === -1 && this.state.trail.length > 0 ){
      // check for accuracy -- i.e. is this a movie the prev actor was in?
      let lastEntry = this.state.trail[this.state.trail.length - 1].name;
      // if we're submitting a movie we need to check if the previous
      // actor is in that movie
      if (this.state.movie){
        // get the cast and see if lastEntry is in it
        mdb.movieCredits({id: response.id}, (err, res) => {
          const cast = res.cast.map(elem => elem.name.toLowerCase())
          if (cast.indexOf(lastEntry.toLowerCase()) !== -1){
            console.log("CORRECT ANSWER",name)
            return this.updateAfterCorrectGuess(name, cast, response.release_date.slice(0,4));
          }
          else{
            console.log("incorrectAnswer")
          }
        })
        return;
      }
      // if we're submitting an actor we can check state.previousCast
      if (this.state.previousCast.indexOf(name.toLowerCase()) !== -1){
        return this.updateAfterCorrectGuess(name)
      }
      console.log("incorrect answer")
    }
    // otherwise we just need to look at the previousCast
    // and see if our guess is in there
  }
  updateAfterCorrectGuess(name, cast, year){
    // update the trail
    let updatedTrail = [...this.state.trail];
    let newEntry = {
      name: name,
      year: year,
      image: '',
    }
    updatedTrail.push(newEntry)
    // update the current player
    let players = this.state.players.map(player => (player.name));
    let activeIndex = players.indexOf(this.state.activePlayer.name) + 1;
    activeIndex = (activeIndex >= this.state.players.length) ? 0 : activeIndex;
    let updatedActivePlayer = this.state.players[activeIndex];
    // update movie or actor for next search
    let acceptingMovie = this.state.movie ? false : true;
    // update state
    this.setState({
      activePlayer: updatedActivePlayer,
      trail: updatedTrail,
      movie: acceptingMovie,
      previousCast: cast,
      guess: '',
    })
  }

  updateAfterWrongGuess(){

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
