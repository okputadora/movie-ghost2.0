import React from 'react';
import classes from './Logo.css';

const Logo = (props) => (
  <div className={classes.Logo}><a href={props.link}>{props.children}</a></div>
)

export default Logo;
