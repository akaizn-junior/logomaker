import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import {
  Landing,
  Navbar,
  Results,
  Pageheader
} from './components';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" render={props => <Landing {...props}/>} />
        <Route path="/results" render={props => <Results {...props}/>} />
        <Route render={() =>
          <Pageheader
            headerTitle="We've lost you!"
            headerSubtitles={[
              'Our machines are hard at working. Come back home.'
            ]}
          />
        } />
      </Switch>
    </Router>
  );
}

render(<App />, document.getElementById('app'));
