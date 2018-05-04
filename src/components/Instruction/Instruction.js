import React from 'react';
import classes from './Instruction.css';

const instruction = (props) => (
  <div className={classes.Instruction}>
    <p>{props.currentTurn}</p>
    <p>{props.currentInstruction}</p>
  </div>
)

export default instruction;
