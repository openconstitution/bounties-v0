import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Funding from './funding';
import FundingDetail from './funding-detail';
import FundingUpdate from './funding-update';
import FundingDeleteDialog from './funding-delete-dialog';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={FundingUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={FundingUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Funding} />
    </Switch>
    <PrivateRoute exact path={`${match.url}/:id/delete`} component={FundingDeleteDialog} hasAnyAuthorities={[AUTHORITIES.USER]} />
  </>
);

export default Routes;
