import React from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Auxil'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
  console.log(props)
  return (
  <Aux>
    <Backdrop
      show={props.show}
      clicked={props.closeModal}
    />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>)
}

export default modal;
