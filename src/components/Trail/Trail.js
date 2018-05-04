import React from 'react'
import TrailItem from './TrailItem/TrailItem'
import classes from './Trail.css'

const trail = (props) => {
  // we can use item as a key because the rules of the game dictate
  // these values must be unique
  let trailElems = props.trail.map(entry => (<TrailItem key={entry.title} title={entry.title} year={entry.year}/>))
  return (
    <div className={classes.Trail}>
      {trailElems}
    </div>
  )
}

export default trail;
