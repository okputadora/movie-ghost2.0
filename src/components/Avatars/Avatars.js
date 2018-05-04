import React from 'react';
import Avatar from './Avatar/Avatar'
import classes from './Avatars.css';

const avatars = (props) => {
  const avatarElems = props.players.map(player => {
    let active = (props.active === player) ? true : false
    return <Avatar name={player} active={active} />
      })
  return (
    <div className={classes.Avatars}>
      {avatarElems}
    </div>
  )
}

export default avatars;
