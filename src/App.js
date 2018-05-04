import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Arena from './containers/Arena/Arena';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <Layout>
        <Arena />
      </Layout>
    );
  }
}

export default App;
