/* eslint-disable react/prop-types */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import {
  Landing,
  Navbar,
  Results,
  Lost
} from './components';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" render={props => <Landing {...props}/>} />
        <Route path="/results" render={props => {
          if (props.location.search) {
            return <Results {...props}/>;
          }

          setTimeout(() => {
            props.history.replace('/');
          }, 100);
        }} />
        <Route render={props => <Lost {...props}/> } />
      </Switch>
    </Router>
  );
}

render(<App />, document.getElementById('app'));
