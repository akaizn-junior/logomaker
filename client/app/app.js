import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import { Landing, Navbar } from './components';

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

render(<App />, document.getElementById('app'));
