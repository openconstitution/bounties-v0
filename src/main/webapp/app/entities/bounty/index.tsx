import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounty from './bounty';
import BountyDetail from './bounty-detail';
import BountyUpdate from './bounty-update';
import BountyDeleteDialog from './bounty-delete-dialog';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={BountyUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={BountyUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BountyDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bounty} />
    </Switch>
    <PrivateRoute exact path={`${match.url}/:id/delete`} component={BountyDeleteDialog} hasAnyAuthorities={[AUTHORITIES.USER]} />
  </>
);

export default Routes;
