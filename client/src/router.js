import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.js'; 

/* const NotFound = () => <h1>404.. This page is not found! (router)</h1>
 */
const Routing = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default Routing;
