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
import { Form, Container, Image, Segment, Grid, Message, Button, Header, Radio } from 'semantic-ui-react'
import { BRadio } from 'app/shared/layout/components/radio';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyUpdate = (props: IBountyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [summary, setSummary] = useState({isEmpty: false, value: ''});
  const [description, setDescription] = useState({isEmpty: false, value: ''});
  const [url, setUrl] = useState({isEmpty: false, value: ''});
  const [mode, setMode] = useState({isEmpty: false, value: ''});
  const [category, setCategory] = useState({isEmpty: false, value: ''});
  const [type, setType] = useState({isEmpty: false, value: ''});
  const [experience, setExperience] = useState({isEmpty: false, value: ''});
  const [expiryDate, setExpiryDate] = useState({isEmpty: false, value: ''});

  const handleSummaryChange = (e) => setSummary({isEmpty: false, value: e.target.value})
  const handleDescriptionChange = (e) => setDescription({isEmpty: false, value: e.target.value})
  const handleUrlChange = (e) => setUrl({isEmpty: false, value: e.target.value})
  const handleModeChange = (e) => setMode({isEmpty: false, value: e.target.value})
  const handleCategoryChange = (e) => setCategory({isEmpty: false, value: e.target.value})
  const handleTypeChange = (e) => setType({isEmpty: false, value: e.target.value})
  const handleExperienceChange = (e) => setExperience({isEmpty: false, value: e.target.value})
  const handleExpiryDateChange = (e) => setExpiryDate({isEmpty: false, value: e.target.value})

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
    const ent = {
      summary: summary.value, description: description.value,
      category: category.value, type: type.value,
      experience: experience.value, expiryDate: expiryDate.value
    }
    alert(JSON.stringify(ent))
  }

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Header style={{ padding: '1em 0em' }}>Enter details about this bounty</Header>
      <Grid textAlign='center' style={{ height: '100vh' }} >
        <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
          <Form onSubmit={handleSubmit}>
            <Form.Input fluid required label="Summary" placeholder='Summary'
              name="summary" value={summary.value} onChange={handleSummaryChange}
            />
            <Form.TextArea fluid label='Description (Optional)' placeholder='Tell us more about this bounty...'
              name="description" value={description.value} onChange={handleDescriptionChange}
            />
            <Form.Input fluid required label="Issue URL" placeholder='url'
              name="url" value={url.value} onChange={handleUrlChange}
            />
            <Form.Group inline>
              <label>Mode</label>
              <Form.Field control={BRadio} label='One' value='1'
                checked={mode.value === '1'} onChange={handleModeChange}
              />
              <Form.Field control={BRadio} label='Two' value='2'
                checked={mode.value === '2'} onChange={handleModeChange}
              />
              <Form.Field control={BRadio} label='Three' value='3'
                checked={mode.value === '3'} onChange={handleModeChange}
              />
            </Form.Group>
            <Form.Select fluid name='category' label='Category' options={categories}
              value={category.value} onChange={handleCategoryChange}
              error={category.isEmpty ? "Please choose a value" : false}
            />
            <Form.Select fluid name='type' label='Type' options={types}
              value={type.value} onChange={handleTypeChange}
              error={type.isEmpty ? "Please choose a value" : false}
            />
            <Form.Select fluid name='experience' label='Experience' options={experiences}
              value={experience.value} onChange={handleExperienceChange}
              error={experience.isEmpty ? "Please choose a value" : false}
            />
            <Form.Input type='date' name='expires' label='Expiry Date'
              value={expiryDate.value} onChange={handleExpiryDateChange}
            />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button type="submit" primary>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
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
