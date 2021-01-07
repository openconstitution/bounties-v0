import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bounty from './bounty';
import Funding from './funding';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { DesktopHeader, MobileHeader } from 'app/shared/layout/header/header';
import { createMedia } from '@artsy/fresnel';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { hot } from 'react-hot-loader';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export interface IRouteProps extends StateProps {match: any}

const Routes = (props: IRouteProps) => {
  
  const { match } = props;

  return (
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}bounty`} component={Bounty} />
      <ErrorBoundaryRoute path={`${match.url}funding`} component={Funding} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>    
  );
}

const mapStateToProps = ({ authentication, applicationProfile, }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(hot(module)(Routes));
