import React from 'react';
import classes from './TrailItem.module.css'

const trailItem = (props) => {
  let style = classes.TrailItem;
  if (props.active) {
    style = [classes.TrailItem, classes.ActiveItem].join(" ")
  }
  return(
    <div className={style}>
      <img className={classes.Img} src={props.image} alt={props.name}/>
      <div className={classes.Text}>{props.name}<span> {props.year}</span></div>
    </div>
  )
}

export default trailItem;
