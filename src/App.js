import React, { Component } from 'react';
import { Provider } from 'react-redux';

import MainPage from "./pages/MainPage";
import Navbar from "./components/navbar";

import store from './store';



export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <MainPage />
        </div>
        <footer style={{
          position: 'fixed',
          bottom: 0
        }}>{'Author: Chebykin Ivan NMT - 463929; Version: 0.0.2;'}</footer>
      </Provider>
    )
  }

}

