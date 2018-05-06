import React from 'react'
import classes from './Navbar.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navBar = (props) => (
  <nav className={classes.Navbar}>
    <NavigationItem logo>MovieGhost</NavigationItem>
    <div className={classes.menuOptions}>
      <NavigationItem mobileMenu clicked={props.opened}><i className="fas fa-bars"></i></NavigationItem>
      <NavigationItem>New Game</NavigationItem>
      <NavigationItem>How to Play</NavigationItem>
      <NavigationItem>Leaderboard</NavigationItem>
    </div>
  </nav>
)

export default navBar;
