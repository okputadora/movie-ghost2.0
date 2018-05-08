import React from 'react';
import classes from './Navbar.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../UI/Logo/Logo'
const navBar = (props) => (
  <nav className={classes.Navbar}>
    <Logo link="/">MovieGhost</Logo>
    <div className={classes.menuOptions}>
      <NavigationItem mobileMenu clicked={props.opened}><i className="fas fa-bars"></i></NavigationItem>
      <NavigationItem link="/Play">New Game</NavigationItem>
      <NavigationItem link="/">How to Play</NavigationItem>
      <NavigationItem link="/">Leaderboard</NavigationItem>
    </div>
  </nav>
)

export default navBar;
