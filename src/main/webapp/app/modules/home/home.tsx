/* eslint-disable react/jsx-key */
import './home.scss';
import {bountyData} from '../../data';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { getSearchEntities, getEntities, reset } from 'app/entities/bounty/bounty.reducer';
import { createPaymentIntent } from 'app/modules/stripe-payment/stripe-payment.reducer';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

// component imports
import Footer from 'app/components/footer/Footer';
import Landing from '../../components/landing/landing';
import AboutCard from '../../components/cards/aboutCard';
import BountyItem from '../../components/itemRow/bountyItem';

// utility imports
import { displaySingleBounty } from '../../util/function-utils';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps {};

export const Home = (props) => {

  const history = useHistory()
  const { isAuthenticated } = props;

  const toBounties = () => {
    history.push('/bounties')
  }

  return (

    <div className="home">
      <div className="home__landing">
        <Landing />
      </div>
      <div className="home__about">
        <h2>About</h2>
        <div className="home__card-box">
          <AboutCard type="Money"/>
          <AboutCard type="Learn"/>
          <AboutCard type="Collaborate"/>
        </div>
      </div>  
      <div className="home__bounties">
        <div className="home__table-box">
          <h2>Bounties</h2>
          <div className="home__table">
            {bountyData.map((bounty, i) => {
              if (i < 6) {
                return (
                  <BountyItem
                    key={i}
                    header={bounty.header}
                    Name={bounty.name}
                    Type={bounty.type}
                    Difficulty={bounty.Difficulty}
                    Amount={bounty.amount}
                    onclick={() => displaySingleBounty(bounty, history)}
                  />
                )
              }
            })}
          </div>
          <button className="btn btn__outline home__table-btn " onClick={() => toBounties()}>
            See all &#8594;
          </button>
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
