import React, { Component } from 'react';
import classes from './TextInput.css';

class TextInput extends Component{
  componentDidMount(){
    this.textInput.focus()
  }
  render(){
    return(
      <input
        ref={(input) => {this.textInput = input}}
        onChange={this.props.changed}
        type="text"
        value={this.props.guess}
        className={classes.TextInput}
      />
    )
  }  
}
export default TextInput
