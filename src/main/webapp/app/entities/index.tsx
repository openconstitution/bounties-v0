import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounty from './bounty';
import Funding from './funding';
import Profile from './profile';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}bounty`} component={Bounty} />
      <ErrorBoundaryRoute path={`${match.url}funding`} component={Funding} />
      <ErrorBoundaryRoute path={`${match.url}profile`} component={Profile} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
