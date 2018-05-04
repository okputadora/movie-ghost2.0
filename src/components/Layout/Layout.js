import React, { Component } from 'react'
import Aux from '../../hoc/Auxil'
import classes from './Layout.css'
import Navbar from '../Navigation/Navbar'
// for mobile only
// import SideMenu from '../Navigation/SideMenu/SideMenu'
// wrapper component -- we pass the children to the main section
class Layout extends Component{
  state = {
    showSideDrawer: false,
  }
  // sideDrawerClosedHandler = () => {
  //   this.setState({showSideDrawer: false})
  // }
  //
  // sideDrawerOpenedHandler = () => {
  //   this.setState({showSideDrawer: true})
  // }
  render () {
    return (
      <Aux>
        <Navbar />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

export default Layout;
