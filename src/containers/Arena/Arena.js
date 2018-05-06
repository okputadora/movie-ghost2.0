import React, { Component } from 'react';
import classes from './Arena.css';
import Instruction from '../../components/Instruction/Instruction';
import Controls from '../../components/Controls/Controls';
import Trail from '../../components/Trail/Trail';
import Aux from '../../hoc/Auxil';
import Modal from '../../components/UI/Modal/Modal';
import mdb from '../../utils/mdb/mdbFunctions';
class Arena extends Component{
  state = {
    players: [
      {
        name: 'mike',
        human: true,
        letters: [],
      },
      {
        name:'robot1',
        human: false,
        letters: [],
      },
      {
        name:'robot2',
        human: false,
        letters: [],
      }
    ],
    activePlayer: {
      name: 'mike',
      human: true,
    },
    movie: true, //boolean for whether the user should be entering a move (false = enter actor)
    previousCast: [],
    trail: [],
    guess: '',
    wrongAnswer: {}
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
    if (this.state.guess.length > 0){
      let guess = this.state.guess;
      // if guessing a movie
      if (this.state.movie){
        mdb.getMovie(guess)
        .then(movie => {
          mdb.getCast(movie.id)
          .then(cast => {
            // if this is the first guess then check MDB to see if the guess is a
            // real movie, but then proceed directly to update
            if (this.state.trail.length === 0){
              this.updateAfterCorrectGuess(movie.name,movie.id,cast,movie.year)
            }
            else{this.checkGuess(movie.name,movie.id,cast,movie.year)}
          })
        })
        .catch((err) => this.updateAfterWrongGuess(err))
      }
      // if guessing an actor
      else{
      mdb.getActor(guess)
      .then(actor => {
        if (this.state.trail.length === 0){
          this.updateAfterCorrectGuess(actor.name, actor.id);
        }
        else{
          console.log("checking the actor")
          this.checkGuess(actor.name, actor.id)}
      })
      .catch((err) => this.updateAfterWrongGuess(err))
    }
    }
  }
  closeModal = () => {
    console.log("closing modal")
    this.setState({
      wrongAnswer: {
        show: false,
        reason: ''
      },
      trail: [],
      guess: '',
      movie: true
    })
  }
  robotGuess = () => {
    // if the robots picking an actor
    if (!this.state.movie){
      // go through previousCast and find one not played yet
      let duplicate;
      let actor;
      let id;
      let previousCast = [...this.state.previousCast]
      for (let i = 0; i < previousCast.length; i++){
        actor = previousCast[i].name;
        id = previousCast[i].id;
        duplicate = false;
        let trail = [...this.state.trail]
        // check against actors and movies already played
        for (let x = 0; x < trail.length; x++){
          let prevEntry = trail[x].name;
          if (actor.toLowerCase() === prevEntry.toLowerCase()){
            duplicate = true;
            break;
          }
        }
        if (!duplicate){
          this.updateAfterCorrectGuess(actor, id)
          break;
        }
      }
      // the robot could not find a unique answer...this shouldn't ever happen
    }
    // if the robot is picking a movie
    else{
      let trail = [...this.state.trail];
      // grab the actor we're trying to match the movie to
      let prevEntry = trail[0].name;
      mdb.getMoviesFromActor(prevEntry)
      .then(possibleMovies => {
        // check these movies against the trail
        let duplicate;
        for (let i = 0; i < possibleMovies.length; i++){
          let title = possibleMovies[i].title.toLowerCase();
          duplicate = false;
          for (let x = 0; x < trail.length; x++){
            let prevEntry = trail[x].name.toLowerCase();
            if (prevEntry === title){
              duplicate = true;
              break;
            }
          }
          // if we found one grab the cast of this movie
          if (!duplicate){
            // get the cast for this movie
            let foundMovie = possibleMovies[i]
            mdb.getCast(possibleMovies[i].id)
            .then(cast => {
              this.updateAfterCorrectGuess(foundMovie.title, foundMovie.id, cast, foundMovie.release_date.slice(0,4))
            })
            break;
          }
        }
      })
    }
  }
  // check human guess
  checkGuess (name, id, cast, year) {
    let trail = [...this.state.trail];
    // get the name of actor or movie
    // check for uniqueness -- THIS NO LONGER WORKS BECAUSE WE'VE CHANGEd TRAIL STRUCTURE
    trail.forEach((item) => {
      if (item.name === name){
        this.updateAfterWrongGuess("duplicate")
      }
    })
    // check for accuracy -- e.g. is this a movie the prev actor was in?
    let lastEntry = trail[0].name;
    // if we're submitting a movie we need to check if the previous
    // actor is in that movie
    if (this.state.movie){
      // get the cast and see if lastEntry is in it
      mdb.getCast(id)
      .then(cast => {
        // create another array to check through
        let castNames = cast.map(elem => (elem.name.toLowerCase()));
        if (castNames.indexOf(lastEntry.toLowerCase()) !== -1){
          return this.updateAfterCorrectGuess(name, id, cast, year);
        }
        else{
          this.updateAfterWrongGuess(lastEntry + " isn't in " + name)
        }
      })
    }
    // if we're submitting an actor we can check state.previousCast
    else{
      console.log("HHHHHH CHECKING THE ACTOR")
      let previousCast = [...this.state.previousCast]
      let duplicate = false;
      previousCast.forEach(actor => {
        // if we find a match, the guess is correct
        if (actor.name === name.toLowerCase()){
          duplicate = true;
        }
      })
      if (duplicate){
        return this.updateAfterCorrectGuess(name, id)
      }
      else{
        this.updateAfterWrongGuess(name + " isn't in " + lastEntry)}
    }
  }

  updateAfterCorrectGuess(name, id, cast, year){
    // get the image
    mdb.getImage(id, this.state.movie)
    .then(image => {
      // update the trail
      let updatedTrail = [...this.state.trail];
      let newEntry = {
        name: name,
        year: year,
        image: image,
      }
      updatedTrail.unshift(newEntry)
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

  updateAfterWrongGuess(reason){
    let ghost = "GHOST".split("");
    let updatedPlayers = [...this.state.players];
    let letters = updatedPlayers[0].letters;
    console.log("letter: ", letters)
    letters.push(ghost[letters.length])
    console.log("Letters: ",letters)
    updatedPlayers[0].letters = letters
    this.setState({
      wrongAnswer: {
        show: true,
        reason: reason
      },
      players: updatedPlayers,
    })
  }
  render(){
    return (
      <Aux>
        <Modal show={this.state.wrongAnswer.show} closeModal={this.closeModal}>
          <div>{this.state.wrongAnswer.reason}</div>
          <div>You have: <span>{this.state.players[0].letters}</span></div>
        </Modal>
        <div className = {classes.Arena}>
          <Instruction
            lastEntry = {this.state.trail[0]}
            activePlayer = {this.state.activePlayer.name}
            acceptingMovie = {this.state.movie}
          />
          <Trail trail = {this.state.trail}/>
          <Controls
            humanPlayer = {this.state.activePlayer.human}
            guessListener = {this.updateGuess}
            guessed = {this.guessHandler}
            players = {this.state.players}
            active = {this.state.activePlayer}
            guess = {this.state.guess}
          />
        </div>
      </Aux>
    )
  }
}

export default Arena;
