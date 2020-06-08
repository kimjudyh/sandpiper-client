import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import './App.css';

function App(props) {
  return (
    <div className="App">
      Hello
      <Routes />
    </div>
  );
}

// gives App access to history, match, other router props
export default withRouter(App);
