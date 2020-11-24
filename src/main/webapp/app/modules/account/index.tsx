import React, { useEffect } from 'react';
import {NavLink as Link, RouteComponentProps } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
// import Password from './password/password';
// import Sessions from './sessions/sessions';
import Profile from './profile/profile';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import { Segment, Grid, Menu, Icon } from 'semantic-ui-react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import Footer from 'app/shared/layout/footer/footer';
// import RegisterDetails from './register-details/register-details'

export interface IRouteProps extends StateProps, RouteComponentProps {
  match: any
}

const Routes = (props: IRouteProps) => {

  const { match, isAuthenticated } = props

  return (
    <div>
      <Segment basic style={{ padding: '5em 5em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>        
              <div>
                <Menu text floated>
                  <Menu.Item position='left' onClick={() => props.history.goBack()}>
                    <h3><Icon name='arrow left' />Back</h3>
                  </Menu.Item>
                </Menu>
                {isAuthenticated && (
                  <Menu text floated='right'>
                    <Menu.Item position='right' as={Link} to='/logout'>
                      <h3>Logout <Icon name='sign-out alternate' /></h3>
                    </Menu.Item>
                  </Menu>
                )}
              </div>
              <br/>
              <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={Profile} />
              <PrivateRoute exact path={`${match.url}/:login/settings`} component={Settings} hasAnyAuthorities={[AUTHORITIES.USER]} />
              {/* 
                <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
                <ErrorBoundaryRoute path={`${match.url}/sessions`} component={Sessions} />
                <ErrorBoundaryRoute path={`${match.url}/register-details`} component={RegisterDetails} />
              */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});
 
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(Routes);
