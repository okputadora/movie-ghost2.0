import React from 'react';
import classes from './Instruction.css';

const instruction = (props) => {
  console.log(props.lastEntry.name)
  let instruction;
  if (props.acceptingMovie){
    instruction = "Enter the name of a movie "
    if (props.lastEntry){
      instruction += "with " + props.lastEntry.name;
    }
  }
  else{
    instruction = "Enter the name of an actor "
    if (props.lastEntry){
      instruction += "in " + props.lastEntry.name;
    }
  }
  const turn = props.activePlayer + "'s turn";
  return (
    <div className={classes.Instruction}>
      <div>{turn}</div>
      <div>{instruction}</div>
    </div>
  )
}

export default instruction;
