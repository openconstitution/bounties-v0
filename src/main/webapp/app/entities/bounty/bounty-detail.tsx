import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import Select from "react-select";
import { getEntity as getFunding, updateEntity as updateFunding, createEntity as createFunding, reset as resetFunding } from 'app/entities/funding/funding.reducer';
import { addFunds, removeFunds, getEntity, getSearchEntities, getEntities } from './bounty.reducer';
import { Grid, Segment, Header, Container, Image, Label, Statistic, Rating, List, Button, Menu, Input, Ref, Sticky, Rail, Placeholder, Popup, Modal, Form, Icon, Divider } from 'semantic-ui-react';
import { createRef } from 'react';
import _ from 'lodash';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { modeOptions } from 'app/shared/model/bounty.model';
import BountyDetailComponent, { DesktopBountyDetailComponent, MobileBountyDetailComponent } from 'app/components/bounty-detail-component';
import { createMedia } from '@artsy/fresnel';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyDetail = (props: IBountyDetailProps) => {
  
  return (
    <div>
      <BountyDetailComponent {...props}/>
    </div>
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
