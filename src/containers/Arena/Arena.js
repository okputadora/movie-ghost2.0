import React, { Component } from 'react';
import Avatars from '../../components/Avatars/Avatars';
import classes from './Arena.css';
import Instruction from '../../components/Instruction/Instruction';
import Submission from '../../components/Submission/Submission'
import Trail from '../../components/Trail/Trail'
class Arena extends Component{
  state = {
    players: [],
    currentTurn: '',
    movie: true, //boolean for whether the user should be entering a move (false = enter actor)
  }
  render(){
    return (
      <div className={classes.Arena}>
        <Instruction
          currentTurn="Mike's turn"
          currentInstruction="Enter the name of a movie or an actor"
        />
        <Submission />
        <Avatars />
        <Trail />
      </div>
    )
  }
}

export default Arena;
