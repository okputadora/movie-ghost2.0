import React from 'react';
import classes from './NavigationItem.module.css';
import { Link } from 'react-router-dom';

const navigationItem = (props) => {
  console.log(props.link)
  let style = classes.NavigationItem
  if (props.logo){
    style = style = [classes.NavigationItem, classes.Logo].join(" ");
  }
  else if (props.mobileMenu){
    style = [classes.NavigationItem, classes.ShowOnMobile].join(" ");
  }
  else {
    style = [classes.NavigationItem, classes.HideOnMobile].join(" ")
  }
  return (
    <div className={style} onClick={props.clicked}>
      <Link to={props.link}>{props.children}</Link>
    </div>
  )
}

export default navigationItem;
