import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxil'
import classes from './SideDrawer.css'
import NavigationItem from '../NavigationItem/NavigationItem'
const sideDrawer = (props) => {
  // conditionall attach css classes for animation
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(" ")}>
        <nav>
          <NavigationItem link='/newGame' mobileMenu>New Game</NavigationItem>
          <NavigationItem link='/instructions' mobileMenu>How to Play</NavigationItem>
          <NavigationItem mobileMenu>Leaderboard</NavigationItem>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
