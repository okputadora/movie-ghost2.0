import React, { Component } from 'react';
import Avatars from '../../components/Avatars/Avatars';
import classes from './Arena.css';
import Instruction from '../../components/Instruction/Instruction';
import Submission from '../../components/Submission/Submission'
import Trail from '../../components/Trail/Trail'
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
    trail: [{name: 'tom hanks', year: null, img:null}],
    guess: '',
  }

  componentDidUpdate(){
    // if its a robots turn
    if (!this.state.activePlayer.human){
      // wait a little bit for a better UX
      // and then let the robot make a "guess"
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
    else {return this.checkGuess(guess)}
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
      // the robot could not find a unique answer...this shouldn't ever happen
    }
    // if the robot is picking a movie
    else{
      let prevEntry = this.state.trail[this.state.trail.length - 1].name
      mdb.searchPerson({query: prevEntry}, (err, res) => {
        let possibleMovies = res.results[0].known_for;
        // go through the possible movies and find a unique one
        // THIS IS THE SAME AS THE FOR LOOPS ABOVE
        // CONSIDER MAKING ITW OWN FUNCTION
        let duplicate;
        for (let i = 0; i < possibleMovies.length; i++){
          let title = possibleMovies[i].title.toLowerCase();
          duplicate = false;
          for (let x = 0; x < this.state.trail.length; x++){
            let prevEntry = this.state.trail[x].name.toLowerCase();
            if (prevEntry === title){
              duplicate = true;
              break;
            }
          }
          if (!duplicate){
            // get the cast for this movie
            mdb.movieCredits({id: possibleMovies[i].id}, (err, res) => {
              let cast = res.cast.map(elem => elem.name.toLowerCase())
              this.updateAfterCorrectGuess(title, cast, possibleMovies[i].release_date.slice(0,4))
            })
            break;
          }
        }
      })
    }
  }
  // check human guess
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
        console.log(response.id)
        // get the cast and see if lastEntry is in it
        mdb.movieCredits({id: response.id}, (err, res) => {
          let cast = res.cast.map(elem => elem.name.toLowerCase())
          if (cast.indexOf(lastEntry.toLowerCase()) !== -1){
            console.log("CORRECT ANSWER",name)
            return this.updateAfterCorrectGuess(name, cast, response.release_date.slice(0,4), response.id);
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
  }

  getImage(id){
    return new Promise((resolve, reject) => {
      if (this.state.movie){
        mdb.movieImages({id: id}, (err, res) => {
          console.log(res)
          let baseUrl =  'http://image.tmdb.org/t/p/w185//'
          let image = baseUrl + res.posters[0].file_path
          resolve(image)
        })
      }
    })
  }

  updateAfterCorrectGuess(name, cast, year, id){
    // get the image
    this.getImage(id)
    .then(image => {
      console.log("IMAGE", image)
      // update the trail
      let updatedTrail = [...this.state.trail];
      let newEntry = {
        name: name,
        year: year,
        image: image,
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
    })
  }

  updateAfterWrongGuess(){

  }
  render(){
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
