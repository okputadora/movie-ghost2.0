import React from "react";
import TrailItem from "./TrailItem/TrailItem";
import classes from "./Trail.module.css";

const trail = props => {
  // we can use item as a key because the rules of the game dictate
  // these values must be unique
  let trailElems = props.trail.map((entry, idx) => {
    return (
      <TrailItem
        key={entry.name}
        name={entry.name}
        image={entry.image}
        year={entry.year}
        active={idx === 0}
      />
    );
  });
  return (
    <div className={classes.TrailContainer}>
      <div className={classes.SubContainer}>{trailElems}</div>
    </div>
  );
};

export default trail;
