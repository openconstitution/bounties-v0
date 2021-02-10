import React from 'react';
import '../content/scss/app.scss'
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Logout from 'app/modules/auth-screens/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import Login from './modules/auth-screens/login';
import Signup from './modules/auth-screens/signup';
import VerifyPassword from './modules/auth-screens/verify-password';
import Bounty from './modules/bounty/bounty';

import Profile from 'app/modules/account/profile/profile';
import Settings from 'app/modules/account/settings/settings';

import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => (
  <div className="app">
    <Switch>
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <ErrorBoundaryRoute path="/sign-in" component={Login} />
      <ErrorBoundaryRoute path="/sign-out" component={Logout} />
      <ErrorBoundaryRoute path="/sign-up" component={Signup} />
      <ErrorBoundaryRoute path="/verify-password" component={VerifyPassword} />

      <ErrorBoundaryRoute path="/bounty" component={Bounty} />

      <ErrorBoundaryRoute path="/hunter" component={Account} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />

      <ErrorBoundaryRoute path="/" component={Entities} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
