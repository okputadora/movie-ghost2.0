import React from 'react';
import classes from './NavigationItem.css'
const navigationItem = (props) => {
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
      <a href={props.link}>{props.children}</a>
    </div>
  )
}

export default navigationItem;
