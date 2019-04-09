import React from "react";
import Avatars from "./Avatars/Avatars";
import Submission from "./Submission/Submission";
import classes from "./Controls.css";

const controls = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.Prompt}>
        <div className={classes.Instructions}>{props.instruction}</div>
        <Submission
          humanPlayer={props.humanPlayer}
          guessListener={props.guessListener}
          guessed={props.guessed}
          guess={props.guess}
        />
      </div>
      <div className={classes.Players}>
        <Avatars active={props.active} players={props.players} />
      </div>
    </div>
  );
};

export default controls;
