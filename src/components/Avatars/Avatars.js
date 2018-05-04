import React from 'react';
import Avatar from './Avatar/Avatar'
import classes from './Avatars.css';

const avatars = (props) => {
  return (
    <div className={classes.Avatars}>
      <Avatar name="mike" active={true}/>
      <Avatar name="bill" active={false}/>
    </div>
  )
}

export default avatars;
