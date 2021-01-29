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
import BountyItem from '../../components/itemRow/item';
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

  const bountyData = [
    {
      header: true,
      name: "NAME",
      type: "TYPE",
      Difficulty: "DIFFICULTY",
      amount: "AMOUNT",
    },
    {
      header: false,
      name: "KGB#110",
      type: "FE",
      Difficulty: "Expert",
      amount: "$90",
    },
    {
      header: false,
      name: "KGB#111",
      type: "FE",
      Difficulty: "Intermediate",
      amount: "$40",
    },
    {
      header: false,
      name: "WKM#187",
      type: "BE",
      Difficulty: "Intermediate",
      amount: "$200",
    },
    {
      header: false,
      name: "WKM#187",
      type: "BE",
      Difficulty: "Intermediate",
      amount: "$200",
    },    
    {
      header: false,
      name: "WKM#387",
      type: "BE",
      Difficulty: "Expert",
      amount: "$300",
    }
  ]

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
          <div className="home__table">
            {bountyData.map((bounty, i) => (
              <BountyItem
                key={i}
                header={bounty.header}
                Name={bounty.name}
                Type={bounty.type}
                Difficulty={bounty.Difficulty}
                Amount={bounty.amount}
                onclick={() => {}}
              />
            ))}
          </div>
          <ButtonOutline title="See all &#8594;" onclick={() => { }}/>
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
