import React, { Component } from 'react'
import classes from './Layout.css'
import Navbar from '../Navigation/Navbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
// for mobile only
// import SideMenu from '../Navigation/SideMenu/SideMenu'
// wrapper component -- we pass the children to the main section
class Layout extends Component{
  state = {
    showSideDrawer: false,
  }
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenedHandler = () => {
    console.log("clicked")
    this.setState({showSideDrawer: true})
  }
  render () {
    return (
      <div className={classes.Layout}>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <Navbar opened={this.sideDrawerOpenedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </div>
    )
  }
};

export default Layout;
