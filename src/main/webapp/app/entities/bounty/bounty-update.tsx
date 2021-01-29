/* eslint-disable react/jsx-key */
import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';

import _ from 'lodash';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import NavBar from 'app/components/navbar/NavBar';
import StructureContainer from 'app/components/__structures/StructureContainer';
import StructureDiv from 'app/components/__structures/StructureDiv';
import BountyStepper from 'app/components/bounties/BountyStepper';
import Footer from 'app/components/footer/Footer';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

interface IBountyFormInput {
  summary: string;
	description: string;
  issueUrl: string;
  category: string;
  type: string;
  experience: string;
  expiryDate: Date;
  amount: number;
  mode: string;
}

const bountyFormSchema = yup.object().shape({
  summary: yup.string().required("please enter a summary"),
  description: yup.string(),
  issueUrl: yup.string().url("Field must be a url").required("Please enter the issue url"),
  // category: yup.string().required("Please select a category"),
  // type: yup.string().required("Please select a type"),
  // experience: yup.string().required("Please select an experience level"),
  // expiryDate: yup.date().min(new Date()).required("Please pick an expiry date"),
  // amount: yup.number().positive().required(),
  // mode: yup.string().required("Please select a mode"),
});

export const BountyUpdate = (props: IBountyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [category, setCategory] = useState('');

  const { bountyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bounty');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);
  
  const { control, errors, handleSubmit } = useForm<IBountyFormInput>({
    resolver: yupResolver(bountyFormSchema)
  });

  const onSubmit = (data: IBountyFormInput) => {
    alert(JSON.stringify(data))
    
    // if (isNew) {
    //   const entity = {
    //     summary: data.summary,
    //     issueUrl: data.issueUrl,
    //     expiryDate: data.expiryDate,
    //     category,
    //     type: data.type,
    //     experience: data.experience,
    //     fundings: [
    //       {
    //         mode: data.mode,
    //         amount: data.amount,
    //       }
    //     ]
    //   }
    //   alert("Saving: " + JSON.stringify(entity))
    //   // props.createEntity(entity);
    // } else {
    //   const entity = {
    //     ...bountyEntity,
    //     summary: data.summary,
    //     issueUrl: data.issueUrl,
    //     expiryDate: data.expiryDate,
    //     category,
    //     type: data.type,
    //     experience: data.experience,
    //     fundings: [
    //       {
    //         ...bountyEntity.fundings[0],
    //         mode: data.mode,
    //         amount: data.amount,
    //       }
    //     ]
    //   }
    //   alert("Updating: " + JSON.stringify(entity))
    //   // props.updateEntity(entity);
    // }
  };

  return (
    <React.Fragment>
      <StructureDiv
        bucket1={[
          <NavBar content={null} />,

          <StructureContainer
            bucket1={[
              <BountyStepper content={{ bounty: bountyEntity }} />,
            ]}
          />,

        ]}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bountyEntity: storeState.bounty.entity,
  loading: storeState.bounty.loading,
  updating: storeState.bounty.updating,
  updateSuccess: storeState.bounty.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyUpdate);
