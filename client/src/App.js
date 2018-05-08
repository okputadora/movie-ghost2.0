import React, { Component } from 'react';
import Layout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom'
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
