// import './home.scss';

import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';

import { getSearchEntities, getEntities, reset } from 'app/entities/bounty/bounty.reducer';
import { createMedia } from '@artsy/fresnel';
import { LandingPageComponent } from 'app/components/landing-page-component';
import { BountyHomeComponent } from 'app/components/bounty-home-component';
import Footer from 'app/shared/layout/footer/footer';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { DesktopHeader, MobileHeader } from 'app/shared/layout/header/header';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps {};

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

export const Home = (props: IHomeProp) => {

  const { isAuthenticated } = props;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <ErrorBoundary>
            <MediaContextProvider>
              <Media greaterThan='mobile'>
                <DesktopHeader
                  isAuthenticated={props.isAuthenticated}
                  isAdmin={props.isAdmin}
                  account={props.account}
                  isInProduction={props.isInProduction}
                  isSwaggerEnabled={props.isSwaggerEnabled}
                />
              </Media>
              <Media at='mobile'>
                <MobileHeader
                  isAuthenticated={props.isAuthenticated}
                  isAdmin={props.isAdmin}
                  account={props.account}
                  isInProduction={props.isInProduction}
                  isSwaggerEnabled={props.isSwaggerEnabled}
                />
              </Media>
            </MediaContextProvider>
          </ErrorBoundary>
          <BountyHomeComponent
            bountyList={props.bountyList}
            loading={props.loading}
            links={props.links}
            totalItems={props.totalItems}
            updateSuccess={props.updateSuccess}
            getSearchEntities={props.getSearchEntities}
            getEntities={props.getEntities}
            reset={props.reset}
            location={props.location}
            history={props.history}
            match={props.match}
          />
          <Footer />
        </div>
      ) : (
        <LandingPageComponent account={props.account} isAuthenticated={props.isAuthenticated} />
      )}
      
  
    </div>
  );
};

const mapStateToProps = storeState => ({
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: storeState.applicationProfile.ribbonEnv,
  isInProduction: storeState.applicationProfile.inProduction,
  isSwaggerEnabled: storeState.applicationProfile.isSwaggerEnabled,

  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,

  bountyList: storeState.bounty.entities,
  loading: storeState.bounty.loading,
  links: storeState.bounty.links,
  totalItems: storeState.bounty.totalItems,
  updateSuccess: storeState.bounty.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
