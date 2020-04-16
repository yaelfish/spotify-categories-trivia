import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SpotifyGameApp from './pages/SpotifyGameApp';
import Home from './pages/Home';
import CategoryGame from './pages/CategoryGame';
import NavBar from './cmps/NavBar';

import './assets/styles/global.scss';

const history = createBrowserHistory();

export default function App() {
  return (
    <div className="App">

      <Router history={history} >
        <NavBar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={SpotifyGameApp} path="/play" exact/>
          <Route component={CategoryGame} path="/category" />
        </Switch>
      </Router>
    </div>
  );
}

