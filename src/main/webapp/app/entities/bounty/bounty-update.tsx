import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getIssues } from 'app/entities/issue/issue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';

import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Form, Segment, Grid, Header, Divider, Input, Loader, Message, Icon, Dropdown } from 'semantic-ui-react'
import _ from 'lodash';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyUpdate = (props: IBountyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [errMessage, setErrMessage] = useState('')
  const [summary, setSummary] = useState({error: '', value: ''});
  const [description, setDescription] = useState({error: '', value: ''});
  const [url, setUrl] = useState({error: '', value: ''});
  const [category, setCategory] = useState({error: '', value: ''});
  const [type, setType] = useState({error: '', value: ''});
  const [experience, setExperience] = useState({error: '', value: ''});
  const [expiryDate, setExpiryDate] = useState({error: '', value: ''});
  const [mode, setMode] = useState({error: '', value: ''});
  const [amount, setAmount] = useState({error: '', value: ''});

  const handleSummaryChange = (e) => setSummary({error: '', value: e.target.value});
  const handleDescriptionChange = (e) => setDescription({error: '', value: e.target.value});
  const handleUrlChange = (e) => setUrl({error: '', value: e.target.value});
  const handleCategoryChange = (e, { value }) => setCategory({error: '', value});
  const handleTypeChange = (e, { value }) => setType({error: '', value});
  const handleExperienceChange = (e, { value }) => setExperience({error: '', value});
  const handleExpiryDateChange = (e) => setExpiryDate({error: '', value: e.target.value});
  const handleModeChange = (e, { value }) => setMode({error: '', value});
  const handleAmountChange = (e) => setAmount({error: '', value: e.target.value});

  const { bountyEntity, loading, updating } = props;

  const categories = [
    { key: 'F', text: 'Frontend', value: Category.FRONT_END },
    { key: 'B', text: 'Backend', value: Category.BACKEND },
    { key: 'T', text: 'This', value: Category.THIS }
  ];
  const types = [
    { key: 'B', text: 'Bug', value: Type.BUG },
    { key: 'F', text: 'Feature', value: Type.FEATURE },
    { key: 'I', text: 'Improvement', value: Type.IMPROVEMENT },
    { key: 'E', text: 'Ex', value: Type.EX }
  ];
  const experiences = [
    { key: 'B', text: 'Beginner', value: Experience.BEGINNER },
    { key: 'I', text: 'Intermediate', value: Experience.INTERMEDIATE },
    { key: 'A', text: 'Experience', value: Experience.ADVANCED }
  ];

  const modes = [
    { key: 'A', text: 'Mode A', value: 'Mode A' },
    { key: 'B', text: 'Mode B', value: 'Mode B' },
    { key: 'C', text: 'Mode C', value: 'Mode C' }
  ];

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

  const handleSubmit = () => {
    setErrMessage('')
    const ent = {
      summary: summary.value, description: description.value,
      url: url.value, category: category.value, type: type.value,
      experience: experience.value, expiryDate: expiryDate.value,
      funding: [
        {amount: amount.value, mode: mode.value}
      ]
    }
    alert(JSON.stringify(ent))
  }

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      {loading ? (
        <Loader active inline='centered' />
      ) : ( <>
        <Message
          attached
          header='Get started here!'
          content='Fill out the form below to post a new bounty'
        />
        <Segment fluid attached>
          <Grid>
            <Grid.Column width='4'/>
            <Grid.Column width='8'>
              <Form onSubmit={handleSubmit}>
              <Form.Input fluid required labelPosition="left" label="Summary" placeholder='Summary'
                          name="summary" value={summary.value} onChange={handleSummaryChange}
                          error={summary.error !== '' && summary.error}
              />
              <Form.TextArea fluid label='Description (Optional)' placeholder='Tell us more about this bounty...'
                              name="description" value={description.value} onChange={handleDescriptionChange}
              />
              <Form.Input required fluid label="Issue URL" placeholder='url'
                          name="url" value={url.value} onChange={handleUrlChange}
                          error={url.error !== '' && url.error}
              />
              <Form.Field>
                <label>Category</label>
                <Dropdown selection name='false' search options={categories}
                          placeholder='Frontend'
                          value={category.value} onChange={handleCategoryChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Type</label>
                <Dropdown selection name='false' search options={types}
                          placeholder='Bug'
                          value={type.value} onChange={handleTypeChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Experience</label>
                <Dropdown selection name='false' search options={experiences}
                          placeholder='Beginner'
                          value={experience.value} onChange={handleExperienceChange}
                />
              </Form.Field>

              <Form.Input required type='date' name='expires' label='Expiry Date'
                          value={expiryDate.value} onChange={handleExpiryDateChange}
                          error={expiryDate.error !== '' && expiryDate.error}
              />

              <Divider horizontal>
                <Header as='h4'>Funding Details</Header>
              </Divider>

              <Form.Field required control={Input} type="number"
                icon='dollar' iconPosition='left' name='amount'
                label='Amount' placeholder='0.00'
                value={amount.value}
                onChange={handleAmountChange}
                error={amount.error !== '' && amount.error}
              />
              <Form.Field>
                <label>Mode</label>
                <Dropdown selection name='mode' search options={modes}
                          placeholder='Mode A'
                          value={mode.value} onChange={handleModeChange}
                />
              </Form.Field>

              <Form.Button color='teal' type="submit" disabled={updating}>Post</Form.Button>
            </Form>
            </Grid.Column>
            <Grid.Column width='4'/>
          </Grid>
        </Segment>
        <Message attached='bottom' hidden={errMessage === ''} warning>
          <Icon name='warning' />
          {errMessage}
        </Message>
      </> )}
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
  getIssues,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyUpdate);
