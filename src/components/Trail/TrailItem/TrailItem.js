import React from 'react';
import classes from './TrailItem.css'

const trailItem = (props) => (
  <div className={classes.TrailItem}>
    <img className={classes.Img} src={props.image} alt={props.name}/>
    <div>{props.name}</div>
    <div>{props.year}</div>
  </div>
)

export default trailItem;
