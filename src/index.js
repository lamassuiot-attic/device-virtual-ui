import React from 'react';
import { render } from 'react-dom';
import uuid from 'react-uuid';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'typeface-roboto';
import dotenv from 'dotenv';

import { CssBaseline } from '@material-ui/core';
import ScrollToTop from './utils/scroll-to-top';
import Identity from './routes/identity';
import Communication from './routes/communication';
import LamassuAppBar from './components/app-bar';

dotenv.config();

render(
  <HashRouter>
    <CssBaseline />
    <LamassuAppBar />
    <ScrollToTop />
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Identity key={uuid()} {...props} />}
      />
      <Route
        exact
        path="/communication"
        render={(props) => <Communication key={uuid()} {...props} />}
      />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
