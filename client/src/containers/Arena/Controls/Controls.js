import React from "react";
import Avatars from "./Avatars/Avatars";
import Submission from "./Submission/Submission";
import classes from "./Controls.css";

const controls = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.Controls}>
        <Avatars active={props.active} players={props.players} />
        <div className={classes.Prompt}>
          <Submission
            humanPlayer={props.humanPlayer}
            guessListener={props.guessListener}
            guessed={props.guessed}
            guess={props.guess}
          />
          {props.instruction}
        </div>
      </div>
    </div>
  );
};

export default controls;
