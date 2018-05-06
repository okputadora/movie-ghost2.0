import React from 'react';
import classes from './Submission.css';
import TextInput from '../../UI/TextInput/TextInput';
import Button from '../../UI/Button/Button';

const submission = (props) => {
  if (props.humanPlayer){
    return (
      <div className={classes.Submission}>
        <TextInput changed={props.guessListener}/>
        <Button clicked={props.guessed}>Enter</Button>
      </div>
    )
  }
  else{
    return (
      <div className={classes.Submission}>
        <div>Robot submission</div>
      </div>
    )
}
}

export default submission;
