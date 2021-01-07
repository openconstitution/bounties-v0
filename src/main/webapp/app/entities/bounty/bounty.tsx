/* eslint-disable react/jsx-key */
import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './bounty.reducer';
import _ from 'lodash';
import StructureDiv from 'app/components/__structures/StructureDiv';
import HorizontalNav2 from 'app/components/horizontal-navs/HorizontalNav2';
import StructureContainer from 'app/components/__structures/StructureContainer';
import BountyList from 'app/components/bounty-list/BountyList';
import Footer1 from 'app/components/footers/Footerer1';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {
  
  return (
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <HorizontalNav2 content={null} />,

          <StructureContainer
            bucket1={[
              <BountyList content={null} />,
            ]}
          />,

          <Footer1 content={null} />,
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
