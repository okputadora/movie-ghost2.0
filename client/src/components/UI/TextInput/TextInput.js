import React, { Component } from 'react';
import classes from './TextInput.module.css';

class TextInput extends Component{
  componentDidMount(){
    this.textInput.focus()
  }
  render(){
    let type = 'text';
    if (this.props.inputType){
      type = this.props.inputType;
    }
    return(
      <input
        ref={(input) => {this.textInput = input}}
        onChange={this.props.changed}
        type={type}
        value={this.props.guess}
        className={classes.TextInput}
        placeholder={this.props.placeHolder}
      />
    )
  }
}
export default TextInput
