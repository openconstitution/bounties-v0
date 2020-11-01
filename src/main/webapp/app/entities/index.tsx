import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';

import Bounty from './bounty';
import Funding from './funding';
import Profile from './profile';
import ErrorBoundary from 'app/shared/error/error-boundary';
import Header from 'app/shared/layout/header/header';
import { createMedia } from '@artsy/fresnel';
import { Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { hot } from 'react-hot-loader';
import Footer from 'app/shared/layout/footer/footer';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export interface IRouteProps extends StateProps, DispatchProps {
  match: any
}

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

const Routes = (props: IRouteProps) => {
  
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const { match } = props;

  return (
    <MediaContextProvider>
      <ErrorBoundary>
        <Header
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          ribbonEnv={props.ribbonEnv}
          isInProduction={props.isInProduction}
          isSwaggerEnabled={props.isSwaggerEnabled}
        />
      </ErrorBoundary>
      
      <Segment basic style={{ padding: '5em 5em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Switch>
                {/* prettier-ignore */}
                <ErrorBoundaryRoute path={`${match.url}bounty`} component={Bounty} />
                <ErrorBoundaryRoute path={`${match.url}funding`} component={Funding} />
                <ErrorBoundaryRoute path={`${match.url}profile`} component={Profile} />
                {/* jhipster-needle-add-route-path - JHipster will add routes here */}
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      
      <Footer />
    </MediaContextProvider>
  );
}

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Routes));

// export default Routes;
