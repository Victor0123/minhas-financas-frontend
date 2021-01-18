import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Inicial from '../pages/Inicial';

function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Inicial} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default routes;
