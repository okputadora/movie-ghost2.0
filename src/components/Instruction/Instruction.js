import React from 'react';
import classes from './Instruction.css';

const instruction = (props) => (
  <div className={classes.Instruction}>
    <div>{props.currentTurn}</div>
    <div>{props.currentInstruction}</div>
  </div>
)

export default instruction;
