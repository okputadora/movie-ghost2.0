import React from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import classes from "./Avatars.module.css";

const avatars = props => {
  const avatarElems = props.players.map((player, i) => {
    let active = props.active.name === player.name ? true : false;
    return (
      <div className={classes.Avatar} style={{ animationDelay: `${i + 1}s` }}>
        <Avatar
          key={player.name}
          name={player.name}
          letters={player.letters}
          active={active}
        />
      </div>
    );
  });
  return <div className={classes.Avatars}>{avatarElems}</div>;
};

export default avatars;
