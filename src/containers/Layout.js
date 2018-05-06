import React, { Component } from 'react';
import classes from './Layout.css';
import Navbar from '../components/Navigation/Navbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import Arena from './Arena/Arena'
import WelcomePage from './WelcomePage/WelcomePage';
import Instructions from './Instructions/Instructions';
import { Route } from 'react-router';
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
          <Route path="/" exact component={WelcomePage} />
          <Route path="/instructions" component={Instructions} />
          <Route path='/newGame' component={Arena} />
        </main>
      </div>
    )
  }
};

export default Layout;