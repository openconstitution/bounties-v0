import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fund from './fund';
import FundDetail from './fund-detail';
import FundUpdate from './fund-update';
import FundDeleteDialog from './fund-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fund} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FundDeleteDialog} />
  </>
);

export default Routes;
