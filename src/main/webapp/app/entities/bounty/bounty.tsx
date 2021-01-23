/* eslint-disable react/jsx-key */
import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './bounty.reducer';
import _ from 'lodash';
import StructureDiv from 'app/components/__structures/StructureDiv';
import NavBar from 'app/components/navBar/NavBar';
import StructureContainer from 'app/components/__structures/StructureContainer';
import BountyList from 'app/components/bounty/BountyList';
import Footer from 'app/components/footer/Footer';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {

  React.useEffect(() => {
    props.getEntities();
  }, []);

  const { bountyList } = props;
  
  return (
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <NavBar content={null} />,

          <StructureContainer
            bucket1={[
              <BountyList content={{bounties: bountyList}} />,
            ]}
          />,

          <Footer content={null} />,
        ]}
      />
    </React.Fragment>
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
