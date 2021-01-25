/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity as getFunding, updateEntity as updateFunding, createEntity as createFunding, reset as resetFunding } from 'app/entities/funding/funding.reducer';
import { addFunds, removeFunds, getEntity, getSearchEntities, getEntities } from './bounty.reducer';
import { createMedia } from '@artsy/fresnel';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

import NavBar from 'app/components/navbar/NavBar';
import StructureContainer from 'app/components/__structures/StructureContainer';
import StructureDiv from 'app/components/__structures/StructureDiv';
import BountyDetails from 'app/components/bounties/BountyDetails';
import { Divider } from '@material-ui/core';
import Comments from 'app/components/comments/Comments';
import Footer from 'app/components/footer/Footer';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {};

export const BountyDetail = (props: IBountyDetailProps) => {

  React.useEffect(() => {
    props.getEntity(props.match.params.id);
  })

  const { account, isAuthenticated, bountyEntity } = props;

  return (
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <NavBar content={null} />,

          <StructureContainer
            bucket1={[
              <BountyDetails content={{ bounty: bountyEntity, isAuthenticated, account }} />,

              <Divider />,

              <Comments content={null} />,
            ]}
          />,

          <Footer content={null} />,
        ]}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication, bounty, funding }: IRootState) => ({
  bountyEntity: bounty.entity,
  bountyList: bounty.entities,
  loading: bounty.loading,
  fundingUpdating: funding.updating,
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account
});

const mapDispatchToProps = {
  getEntity,
  getEntities,
  getSearchEntities,

  addFunds,
  removeFunds,

  getFunding,
  resetFunding,
  updateFunding,
  createFunding,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
