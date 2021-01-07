import React, { useEffect } from 'react';
import {NavLink as Link, RouteComponentProps } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
// import Password from './password/password';
// import Sessions from './sessions/sessions';
import Profile from './profile/profile';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
// import RegisterDetails from './register-details/register-details'

export interface IRouteProps extends StateProps, RouteComponentProps {
  match: any
}

const Routes = (props: IRouteProps) => {

  const { match, isAuthenticated } = props

  return (
    <div>
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={Profile} />
      <PrivateRoute exact path={`${match.url}/:login/settings`} component={Settings} hasAnyAuthorities={[AUTHORITIES.USER]} />
      {/* 
        <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
        <ErrorBoundaryRoute path={`${match.url}/sessions`} component={Sessions} />
        <ErrorBoundaryRoute path={`${match.url}/register-details`} component={RegisterDetails} />
      */}
    </div>
  );
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});
 
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(Routes);
