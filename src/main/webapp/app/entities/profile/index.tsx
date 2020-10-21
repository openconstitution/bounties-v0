import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Profile from './profile';
import ProfileDetail from './profile-detail';
import ProfileUpdate from './profile-update';
import ProfileDeleteDialog from './profile-delete-dialog';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={ProfileUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={ProfileUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfileDetail} />
      <ErrorBoundaryRoute path={match.url} component={Profile} />
    </Switch>
    <PrivateRoute exact path={`${match.url}/:id/delete`} component={ProfileDeleteDialog} hasAnyAuthorities={[AUTHORITIES.USER]} />
  </>
);

export default Routes;
