import React from 'react';
import Avatars from '../Avatars/Avatars'
import Submission from './Submission/Submission'
import classes from './Controls.css'

const controls = (props) => {
  return (
    <div className={classes.Controls}>
      <Submission
        humanPlayer={props.humanPlayer}
        guessListener={props.guessListener}
        guessed={props.guessed}
        guess={props.guess}
      />
      <Avatars active={props.active} players={props.players}/>
    </div>
  )
}

export default controls;
