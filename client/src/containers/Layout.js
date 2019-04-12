import React, { Component } from "react";
import classes from "./Layout.module.css";
import Navbar from "../components/Navigation/Navbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import WelcomePage from "./WelcomePage/WelcomePage";
import Arena from "./Arena/Arena";
import Instructions from "./Instructions/Instructions";
import Account from "./Account/Account";
import { Route } from "react-router";
// for mobile only
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  componentDidMount() {}
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenedHandler = () => {
    console.log("clicked");
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <Navbar opened={this.sideDrawerOpenedHandler} />
        <main className={classes.Content}>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/play" exact component={Arena} />
          <Route path="/instructions" exact component={Instructions} />
          <Route path="/account" exact component={Account} />
        </main>
      </div>
    );
  }
}

export default Layout;
