import React from 'react';
import classes from './Submission.css';
import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';

const submission = (props) => (
  <div className={classes.Submission}>
    <TextInput changed={props.guessListener}/>
    <Button clicked={props.guessed}>Enter</Button>
  </div>
)

export default submission;
