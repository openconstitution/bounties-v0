import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Issue from './issue';
import IssueDetail from './issue-detail';
import IssueUpdate from './issue-update';
import IssueDeleteDialog from './issue-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IssueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IssueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IssueDetail} />
      <ErrorBoundaryRoute path={match.url} component={Issue} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IssueDeleteDialog} />
  </>
);

export default Routes;
