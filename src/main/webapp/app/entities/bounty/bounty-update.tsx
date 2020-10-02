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
import { Form, Container, Image, Segment, Grid, Message, Button, Header, Radio, Divider, Icon, Input, Label, Loader } from 'semantic-ui-react'
import { BRadio } from 'app/shared/layout/components/radio';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyUpdate = (props: IBountyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [summary, setSummary] = useState({isEmpty: false, value: ''});
  const [description, setDescription] = useState({isEmpty: false, value: ''});
  const [url, setUrl] = useState({isEmpty: false, value: ''});
  const [category, setCategory] = useState({isEmpty: false, value: ''});
  const [type, setType] = useState({isEmpty: false, value: ''});
  const [experience, setExperience] = useState({isEmpty: false, value: ''});
  const [expiryDate, setExpiryDate] = useState({isEmpty: false, value: ''});
  const [mode, setMode] = useState({isEmpty: false, value: ''});
  const [amount, setAmount] = useState({isEmpty: false, value: ''});

  const handleSummaryChange = (e) => setSummary({isEmpty: false, value: e.target.value})
  const handleDescriptionChange = (e) => setDescription({isEmpty: false, value: e.target.value})
  const handleUrlChange = (e) => setUrl({isEmpty: false, value: e.target.value})
  const handleCategoryChange = (e) => setCategory({isEmpty: false, value: e.target.value})
  const handleTypeChange = (e) => setType({isEmpty: false, value: e.target.value})
  const handleExperienceChange = (e) => setExperience({isEmpty: false, value: e.target.value})
  const handleExpiryDateChange = (e) => setExpiryDate({isEmpty: false, value: e.target.value})
  const handleModeChange = (e) => setMode({isEmpty: false, value: e.target.value})
  const handleAmountChange = (e) => setAmount({isEmpty: false, value: e.target.value})

  const { bountyEntity, loading, updating } = props;

  const categories = () => {
    return (
      <datalist id='categories'>
        <option value='Frontend'>{Category.FRONT_END}</option>
        <option value='Backend'>{Category.BACKEND}</option>
        <option value='This'>{Category.THIS}</option>
      </datalist>
    )
  }

  const types = () => {
    return (
      <datalist id='types'>
        <option value='Bug'>{Type.BUG}</option>
        <option value='Feature'>{Type.FEATURE}</option>
        <option value='Improvement'>{Type.IMPROVEMENT}</option>
        <option value='Ex'>{Type.EX}</option>
      </datalist>
    )
  }
  const experiences = () => {
    return (
      <datalist id='experiences'>
        <option value='Beginner'>{Experience.BEGINNER}</option>
        <option value='Intermediate'>{Experience.INTERMEDIATE}</option>
        <option value='Advanced'>{Experience.ADVANCED}</option>
      </datalist>
    )
  }

  const modes = () => {
    return (
      <datalist id='modes'>
        <option value='Mode A'>Mode A</option>
        <option value='Mode B'>Mode B</option>
        <option value='Mode C'>Mode C</option>
      </datalist>
    )
  }

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
      experience: experience.value, expiryDate: expiryDate.value,
      funding: [
        {amount: amount.value, mode: mode.value}
      ]
    }
    alert(JSON.stringify(ent))
  }

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Header style={{ padding: '1em 0em' }}>Enter details about this bounty</Header>
      {loading ? (
        <Loader active inline='centered' />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450 }} textAlign='left'>
              <Form.Input fluid required labelPosition="left" label="Summary" placeholder='Summary'
                name="summary" value={summary.value} onChange={handleSummaryChange}
                error={summary.isEmpty && "Please enter bounty summary"}
              />
              <Form.TextArea fluid label='Description (Optional)' placeholder='Tell us more about this bounty...'
                name="description" value={description.value} onChange={handleDescriptionChange}
              />
              <Form.Input required fluid label="Issue URL" placeholder='url'
                name="url" value={url.value} onChange={handleUrlChange}
                error={url.isEmpty && "Please enter a valid url"}
              />
              <Form.Input required fluid name='category' label='Category' list='categories'
                value={category.value} onChange={handleCategoryChange}
                error={category.isEmpty && "Please choose a value"}
              />
              {categories()}
              <Form.Input required fluid name='type' label='Type' list='types'
                value={type.value} onChange={handleTypeChange}
                error={type.isEmpty && "Please choose a value"}
              />
              {types()}
              <Form.Input required fluid name='experience' label='Experience' list='experiences'
                value={experience.value} onChange={handleExperienceChange}
                error={experience.isEmpty && "Please choose a value"}
              />
              {experiences()}
              <Form.Input required type='date' name='expires' label='Expiry Date'
                value={expiryDate.value} onChange={handleExpiryDateChange}
                error={expiryDate.isEmpty && "Please pick a date"}
              />
            </Grid.Column>
          </Grid>

          <Divider horizontal>
            <Header as='h4'>Funding Details</Header>
          </Divider>
          
          <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450 }} textAlign='left'>
              <Form.Field required control={Input} type="number"
                icon='dollar' iconPosition='left' name='amount'
                label='Amount' placeholder='Amount'
                value={amount.value}
                onChange={handleAmountChange}
                error={amount.isEmpty && "Please enter a value"}
              />
              <Form.Input required fluid name='mode' label='Mode' list='modes'
                value={mode.value} onChange={handleModeChange}
                error={mode.isEmpty && "Please enter a valid mode"}
              />
              {modes()}
            </Grid.Column>
          </Grid>
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Form.Button type="submit" disabled={updating}>Submit</Form.Button>
        </Form>
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
  getIssues,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyUpdate);
