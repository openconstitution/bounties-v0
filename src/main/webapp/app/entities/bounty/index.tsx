import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounty from './bounty';
import BountyDetail from './bounty-detail';
import BountyUpdate from './bounty-update';
import BountyDeleteDialog from './bounty-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BountyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BountyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BountyDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bounty} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BountyDeleteDialog} />
  </>
);

export default Routes;
