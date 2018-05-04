import React from 'react'
import TrailItem from './TrailItem/TrailItem'
import classes from './Trail.css'

const trail = (props) => (
  <div className={classes.Trail}>
    <TrailItem />
  </div>
)

export default trail;
