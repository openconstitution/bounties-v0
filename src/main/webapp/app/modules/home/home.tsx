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

// component imports
import Footer from 'app/components/footer/Footer';
import Landing from '../../components/landing/landing';
import AboutCard from '../../components/cards/aboutCard';
import BountyTable from '../../components/bounties/bounty-table';
import ButtonOutline from 'app/components/buttons/buttonOutline';

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

    <div className="home">
      <div className="home__landing">
        <Landing />
      </div>
      <div className="home__about">

        <h2>About</h2>

        <div className="home__card-box">
          <AboutCard />
          <AboutCard />
          <AboutCard />
        </div>
      </div>  
      <div className="home__bounties">
        <div className="home__table-box">
          <h2>Bounties</h2>
          <BountyTable />
          <ButtonOutline title="See All &#8594;" onclick={() => { }}/>
        </div>
      </div>
      <Footer />
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
  createPaymentIntent,
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
