import React, { Component } from 'react';
import classes from './Instructions.module.css'
import divider from '../../assets/divider.png';


class Instructions extends Component{
  render(){
    return(
      <div className={classes.Instructions}>
        <div className={classes.Header}>Instructions</div>
        <img src={divider} height="30px" alt=''/>
        <p className={classes.Text}>This game tests your knowledge of movies and actors</p>
        <p className={classes.Text}>To start, one player says the name of any movie</p>
        <p className={classes.Text}>Then the next player has to say the name of an actor in that movie</p>
        <p className={classes.Text}>Game play continues like this, alternating between movies and actors
        (without repeating) until one player can't think of an answer</p>
        <p className={classes.Text}>Failure to come up with an answer results in that player getting a letter (like H O R S E
        except we're playing G H O S T)</p>
      </div>
    )
  }
}

export default Instructions;
