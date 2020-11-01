import './home.scss';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { Segment, Container, Image, Header, Button, Divider, Grid, List } from 'semantic-ui-react';
import { getSearchEntities, getEntitiesPerPage as getEntities, reset } from 'app/entities/bounty/bounty.reducer';
import { createMedia } from '@artsy/fresnel';
import { LandingPageComponent } from './landing-page-component';
import BountyHomeComponent from './bounty-home-component';

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
      ) : (
        <LandingPageComponent account={props.account} isAuthenticated={props.isAuthenticated} />
      )}
      
  
    </div>
  );
};

const mapStateToProps = storeState => ({
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
