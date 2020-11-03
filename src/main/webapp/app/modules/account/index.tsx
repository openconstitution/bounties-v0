import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
// import Password from './password/password';
// import Sessions from './sessions/sessions';
import Profile from './profile/profile';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
// import RegisterDetails from './register-details/register-details'

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path={`${match.url}:login`} component={Profile} />
    <PrivateRoute exact path={`${match.url}:login/settings`} component={Settings} hasAnyAuthorities={[AUTHORITIES.USER]} />
    {/* 
      <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
      <ErrorBoundaryRoute path={`${match.url}/sessions`} component={Sessions} />
      <ErrorBoundaryRoute path={`${match.url}/register-details`} component={RegisterDetails} />
    */}
  </div>
);

export default Routes;
