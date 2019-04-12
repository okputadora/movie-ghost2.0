import React from 'react';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = (props) => (
  <div className={classes.Logo}><Link to={props.link}>{props.children}</Link></div>
)

export default Logo;
