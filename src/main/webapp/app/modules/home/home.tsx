/* eslint-disable react/jsx-key */
import './home.scss';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';

import { getSearchEntities, getEntities, reset } from 'app/entities/bounty/bounty.reducer';
import { createPaymentIntent } from 'app/modules/stripe-payment/stripe-payment.reducer';
import { createMedia } from '@artsy/fresnel';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

import Features1 from 'app/components/features/Features1';
import Features2 from 'app/components/features/Features2';
import Features3 from 'app/components/features/Features3';
import Header2 from 'app/components/headers/Header2';
import HomeHorizontalNav from 'app/components/horizontal-navs/HomeHorizontalNav';
import HowItWorks2 from 'app/components/how-it-works/HowItWorks2';
import StructureContainer from 'app/components/__structures/StructureContainer';
import StructureDiv from 'app/components/__structures/StructureDiv';
import Footer1 from 'app/components/footers/Footerer1';

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
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <HomeHorizontalNav content={null} />,

          <StructureContainer
            bucket1={[
              <Header2 content={null} />,

              <Features3 content={null} />,

              <Features1 content={null} />,

              <Features2 content={null} />,

              <HowItWorks2 content={null} />,
            ]}
          />,

          <Footer1 content={null} />,
        ]}
      />
    </React.Fragment>
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
  createPaymentIntent,
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
