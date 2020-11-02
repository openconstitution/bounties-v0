import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntitiesPerPage as getEntities, reset } from './bounty.reducer';
import _ from 'lodash';
import BountyHomeComponent from 'app/components/bounty-home-component';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {
  
  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyList: bounty.entities,
  loading: bounty.loading,
  links: bounty.links,
  totalItems: bounty.totalItems,
  updateSuccess: bounty.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bounty);
