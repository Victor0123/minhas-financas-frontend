import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import DashboardEdit from '../pages/Dashboard/edit';
import DashboardDelete from '../pages/Dashboard/delete';
import Profile from '../pages/Profile';

function routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route
        path="/dashboard/editar/:idLancamento"
        component={DashboardEdit}
        isPrivate
      />
      <Route
        path="/dashboard/delete/:idLancamento"
        component={DashboardDelete}
        isPrivate
      />
      <Route exact path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}

export default routes;
