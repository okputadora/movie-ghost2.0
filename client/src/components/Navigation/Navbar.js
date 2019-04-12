import React from 'react';
import classes from './Navbar.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../UI/Logo/Logo'
const navBar = (props) => (
  <nav className={classes.Navbar}>
    <Logo link="/">MovieGhost</Logo>
    <div className={classes.menuOptions}>
      <NavigationItem link="#" mobileMenu clicked={props.opened}><i className="fas fa-bars"></i></NavigationItem>
      <NavigationItem link="/play">New Game</NavigationItem>
      <NavigationItem link="/instructions">How to Play</NavigationItem>
      <NavigationItem link="/leaderboard">Leaderboard</NavigationItem>
      <NavigationItem link="/account">Account</NavigationItem>
    </div>
  </nav>
)

export default navBar;
