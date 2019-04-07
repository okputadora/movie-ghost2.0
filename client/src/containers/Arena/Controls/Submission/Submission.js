import React from "react";
import classes from "./Submission.css";
import TextInput from "../../../../components/UI/TextInput/TextInput";
import Button from "../../../../components/UI/Button/Button";

const submission = props => {
  if (props.humanPlayer) {
    return (
      <div className={classes.Submission}>
        <TextInput guess={props.guess} changed={props.guessListener} />
        <Button id="enterGuess" clicked={props.guessed}>
          Enter
        </Button>
      </div>
    );
  } else {
    return (
      <div className={classes.Submission}>
        <div>Robot submission</div>
      </div>
    );
  }
};

export default submission;
