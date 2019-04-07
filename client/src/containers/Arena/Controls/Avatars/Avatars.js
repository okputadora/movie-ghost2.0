import React from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import classes from "./Avatars.css";

const avatars = props => {
  const avatarElems = props.players.map(player => {
    let active = props.active.name === player.name ? true : false;
    return (
      <Avatar
        key={player.name}
        name={player.name}
        letters={player.letters}
        active={active}
      />
    );
  });
  return <div className={classes.Avatars}>{avatarElems}</div>;
};

export default avatars;
