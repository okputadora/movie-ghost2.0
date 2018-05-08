import React from 'react'
import blankAvatar from '../../../assets/blankAvatar.png'
import classes from './Avatar.css'
const avatar = (props) => {

  // conditionally render image size based on active status
  let imgClass = classes.OnDeck
  if (props.active){
    imgClass = classes.Active;
  }
  return (
    <div className={classes.Avatar}>
      <img className={imgClass} src={blankAvatar} alt={props.name}/>
      <div className={classes.AvName}>{props.name}</div>
      <div className={classes.AvName}>{props.letters}</div>
    </div>
  )
}

export default avatar;
