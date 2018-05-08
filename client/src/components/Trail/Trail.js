import React from 'react'
import TrailItem from './TrailItem/TrailItem'
import classes from './Trail.css'

const trail = (props) => {
  // we can use item as a key because the rules of the game dictate
  // these values must be unique
  let trailElems = props.trail.map((entry, index) => {
    let mostRecent = false;
    if (index === 0){
      mostRecent = true;
    }
    return (
      <TrailItem
        key={entry.name}
        name={entry.name}
        image={entry.image}
        year={entry.year}
        active={mostRecent}
      />
    )
  })
  return (
    <div className={classes.Trail}>
      {trailElems}
    </div>
  )
}

export default trail;
