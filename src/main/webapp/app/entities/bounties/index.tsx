import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounties from './bounties';
import BountiesDetail from './bounties-detail';
import BountiesUpdate from './bounties-update';
import BountiesDeleteDialog from './bounties-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BountiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BountiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BountiesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bounties} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BountiesDeleteDialog} />
  </>
);

export default Routes;
