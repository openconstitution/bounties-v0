import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';

import { Type } from 'app/shared/model/enumerations/type.model';
// import Select from "react-select";
import { Form, Segment, Dropdown as Select, Grid, Input, Loader, Message, Divider, Header } from 'semantic-ui-react'
import _ from 'lodash';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { categoryOptions, experienceOptions, modeOptions, typeOptions } from 'app/shared/model/bounty.model';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

interface IOpts {text: string, value: Type, message: string}
interface IBountyFormInput {
  summary: string;
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
  issueUrl: yup.string().url("Field must be a url").required("Please enter the issue url"),
  // category: yup.string().required("Please select a category"),
  // type: yup.string().required("Please select a type"),
  // experience: yup.string().required("Please select an experience level"),
  expiryDate: yup.date().min(new Date()).required("Please pick an expiry date"),
  amount: yup.number().positive().required(),
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
    // alert(JSON.stringify(data))
    
    if (isNew) {
      const entity = {
        summary: data.summary,
        issueUrl: data.issueUrl,
        expiryDate: data.expiryDate,
        category,
        type: data.type,
        experience: data.experience,
        fundings: [
          {
            mode: data.mode,
            amount: data.amount,
          }
        ]
      }
      alert("Saving: " + JSON.stringify(entity))
      // props.createEntity(entity);
    } else {
      const entity = {
        ...bountyEntity,
        summary: data.summary,
        issueUrl: data.issueUrl,
        expiryDate: data.expiryDate,
        category,
        type: data.type,
        experience: data.experience,
        fundings: [
          {
            ...bountyEntity.fundings[0],
            mode: data.mode,
            amount: data.amount,
          }
        ]
      }
      alert("Updating: " + JSON.stringify(entity))
      // props.updateEntity(entity);
    }
  };

  return (
    <Segment vertical>
      {loading ? (
        <Loader active inline='centered' />
      ) : (
        <div>
          <Message
            attached
            header='Get started here!'
            content='Fill out the form below to post a new bounty'
          />
          <Segment fluid attached>
            <Grid>
              <Grid.Column width='4'/>
              <Grid.Column width='8'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Field
                    required
                    error={errors.summary?.message}>
                    <label>Summary</label>
                    <Controller
                      as={Input}
                      name="summary"
                      placeholder="Summary"
                      control={control}
                      defaultValue={bountyEntity?.summary}
                    />
                    {errors.summary && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.summary?.message}
                      </div>
                    )}
                  </Form.Field>
                  <Form.Field
                    required
                    error={errors.issueUrl?.message}>
                    <label>Issue url</label>
                    <Controller
                      as={Input}
                      name="issueUrl"
                      placeholder="Issuer url"
                      control={control}
                      defaultValue={bountyEntity.issueUrl}
                    />
                    {errors.issueUrl && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.issueUrl?.message}
                      </div>
                    )}
                  </Form.Field>

                  <Form.Field
                    required
                    error={errors.category?.message}>
                    <label>Category</label>
                    <Controller
                      name="category"
                      placeholder="Category"
                      as={<Select />}
                      selection
                      value={category}
                      onChange={(e, { value }) => setCategory(value)}
                      control={control}
                      options={categoryOptions}
                      defaultValue={bountyEntity.category}
                      style={errors.category === null ? {background: "#fff6f6", borderColor: "#e0b4b4"} : null}
                    />
                    {errors.category && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.category?.message}
                      </div>
                    )}
                  </Form.Field>
                  <Form.Field
                    required
                    error={errors.type?.message}>
                    <label>Type</label>
                    <Controller
                      name="type"
                      placeholder="Type"
                      as={Select}
                      selection
                      defaultValue={bountyEntity.type}
                      control={control}
                      options={typeOptions}
                    />
                    {errors.type && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.type?.message}
                      </div>
                    )}
                  </Form.Field>
                  <Form.Field
                    required
                    error={errors.experience?.message}>
                    <label>Experience</label>
                    <Controller
                      name="experience"
                      placeholder="Experience"
                      as={Select}
                      selection
                      defaultValue={bountyEntity.experience}
                      options={experienceOptions}
                      control={control}
                    />
                    {errors.experience && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.experience?.message}
                      </div>
                    )}
                  </Form.Field>
                  
                  <Form.Field
                    required
                    error={errors.expiryDate?.message}>
                    <label>Expiry date</label>
                    <Controller
                      as={Input}
                      type='date'
                      name="expiryDate"
                      placeholder="Expiry date"
                      control={control}
                      defaultValue={bountyEntity.expiryDate}
                    />
                    {errors.expiryDate && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.expiryDate?.message}
                      </div>
                    )}
                  </Form.Field>
                  
                  <Divider horizontal>
                    <Header as='h4'>Funding Details</Header>
                  </Divider>

                  <Form.Field
                    required
                    error={errors.amount?.message}>
                    <label>Amount</label>
                    <Controller
                      as={Input}
                      name="amount"
                      placeholder="Amount"
                      control={control}
                      defaultValue={_.isEmpty(bountyEntity.fundings) ? null : bountyEntity.fundings[0].amount}
                    />
                    {errors.amount && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.amount?.message}
                      </div>
                    )}
                  </Form.Field>
                  <Form.Field
                    required
                    error={errors.mode?.message}>
                    <label>Mode</label>
                    <Controller
                      name="mode"
                      placeholder="Mode"
                      as={Select}
                      selection
                      control={control}
                      options={modeOptions}
                      defaultValue={_.isEmpty(bountyEntity.fundings) ? null : bountyEntity.fundings[0].mode}
                    />
                    {errors.mode && (
                      <div className={"ui pointing above prompt label"}>
                        {errors.mode?.message}
                      </div>
                    )}
                  </Form.Field>
                  <Form.Button color='teal' type="submit" disabled={updating}>Post</Form.Button>
                </Form>
              </Grid.Column>
              <Grid.Column width='4'/>
            </Grid>
          </Segment>
        </div>
      )}
    </Segment>
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
