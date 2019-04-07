import React from "react";
import Avatars from "./Avatars/Avatars";
import Submission from "./Submission/Submission";
import classes from "./Controls.css";

const controls = props => {
  console.log(props);
  return (
    <div className={classes.Container}>
      <div className={classes.Controls}>
        <Avatars active={props.active} players={props.players} />
        <Submission
          humanPlayer={props.humanPlayer}
          guessListener={props.guessListener}
          guessed={props.guessed}
          guess={props.guess}
        />
      </div>
    </div>
  );
};

export default controls;
