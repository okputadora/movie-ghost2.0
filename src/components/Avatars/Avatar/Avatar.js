import React from 'react'
import blankAvatar from '../../../assets/blankAvatar.png'
import classes from './Avatar.css'
const avatar = (props) => {

  // conditionally render image size based on active status
  let imgClass = classes.OnDeck
  if (props.active){
    console.log("active?")
    imgClass = classes.Active;
    console.log(imgClass)
  }
  console.log(imgClass)
  return (
    <div className={classes.Avatar}>
      <img className={imgClass} src={blankAvatar} alt={props.name}/>
      <div>{props.name}</div>
    </div>
  )
}

export default avatar;
