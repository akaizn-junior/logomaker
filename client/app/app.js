/* eslint-disable react/prop-types */
import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// global styles
import './app.css';
// helpers
import {
  toggleDatasetJsOn,
  checkDarkMode
} from './utils/browser';
// parts
import {
  Landing,
  Navbar,
  Gallery,
  Lost,
  LogoEditor
} from './components';

toggleDatasetJsOn();
checkDarkMode();

function App() {
  return (
    <Router>
      <Navbar />
      <header>
        <h1>We deliver logos.</h1>
      </header>
      <Switch>
        <Route exact path="/" render={props => <Landing {...props}/>} />
        <Route path="/gallery" render={props => {
          if (props.location.search) {
            return <Gallery {...props} />;
          }

          setTimeout(() => {
            props.history.replace('/');
          }, 100);
        }} />
        <Route path="/editor" render={props => {
          if (props.location.search) {
            return <LogoEditor {...props} />;
          }

          setTimeout(() => {
            props.history.replace('/');
          }, 100);
        }} />
        <Route render={props => <Lost {...props}/> } />
      </Switch>
      <footer>
        <span>&copy; 2020 Simao Nziaka</span>
      </footer>
    </Router>
  );
}

render(
  <App />,
  document.getElementById('app')
);
