import React from 'react';
import classes from './TextInput.css';

const textInput = (props) => (
  <input
    onChange={props.changed}
    type="text"
    className={classes.TextInput}
  />
)
export default textInput
