import React from 'react';
import classes from './TrailItem.css'

const trailItem = (props) => (
  <div className={classes.TrailItem}>
    <div className={classes.Img}>Image placeholder</div>
    <div>{props.title}</div>
    <div>({props.year})</div>
  </div>
)

export default trailItem;
