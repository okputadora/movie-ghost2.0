import React from 'react';
import classes from './TrailItem.css'

const trailItem = (props) => (
  <div className={classes.TrailItem}>
    <img className={classes.Img} src={props.image} alt={props.name}/>
    <div className={classes.Text}>{props.name}<span> {props.year}</span></div>
  </div>
)

export default trailItem;
