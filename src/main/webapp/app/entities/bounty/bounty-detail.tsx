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
import Timer from './bounty-timer';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { modeOptions } from 'app/shared/model/bounty.model';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

interface IBountyFormInput {
  amount: number;
  mode: {label: string, value: string, message: string};
}

const bountyFormSchema = yup.object().shape({
  amount: yup.number().positive().integer().required(),
  mode: yup.object().required("Please select a mode"),
});

export const BountyDetail = (props: IBountyDetailProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const  options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const [activeItem, setActiveItem] = useState(props.match.params.id);

  const { bountyEntity, bountyList, loading, isAuthenticated, account } = props;

  const contextRef = createRef<HTMLElement>()

  const hasExpired = (dateString: string) => {
	  return +new Date(dateString) - +new Date() <= 0;
  }

  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getEntities();
  }, []);

  const startSearching = (event) => {
    const key = event.keyCode || event.which;
    if (key === 13){
      if (search) {
        props.getSearchEntities(search);
      }
    }
  };

  const bountySlice = () => {
    let myBounty
    bountyList.forEach(bounty => {
      if (bounty.id.toString() === props.match.params.id) {
        myBounty = bounty;
      }
    })
    const myIndex = bountyList.indexOf(myBounty);

    if (bountyList.slice(myIndex, myIndex+5).length >= 5) {
      return bountyList.slice(myIndex, myIndex+5);
    } else if (bountyList.slice(myIndex-4, myIndex+1).length >= 5) {
      return bountyList.slice(myIndex-4, myIndex+1);
    } else

      if (bountyList.slice(myIndex-2, myIndex+3).length >= 5) {
        return bountyList.slice(myIndex-2, myIndex+3);
      } else if (bountyList.slice(myIndex+2, myIndex-3).length >= 5) {
        return bountyList.slice(myIndex+2, myIndex-3);
      }

        else {
          return bountyList;
        }
  }

  const getDifficulty = (experience: Experience) => {
    if (experience === Experience.ADVANCED) {
      return 3
    } else if (experience === Experience.INTERMEDIATE) {
      return 2
    } else if (experience === Experience.BEGINNER) {
      return 1
    } else {
      return 0
    }
  }

  const { control, errors, handleSubmit } = useForm<IBountyFormInput>({
    resolver: yupResolver(bountyFormSchema)
  });

  const onSubmit = (data: IBountyFormInput) => {
    alert(JSON.stringify(data));
    const entity = {
      mode: data.mode.value,
      amount: data.amount,
    }
    window.location.reload(false)

    setOpen(false);


    // if (isNew) {
    //   props.createFunding(entity);
    // } else {
    //   props.createFunding(entity);
    // }
  };

  return (
    <div style={{ padding: '8em 0em 8em 0em' }}>
      <Ref innerRef={contextRef}>
        <Grid centered columns='2'>
          <Grid.Column width={12}>
            <Segment basic>
              <Grid columns={2}>
                <Grid.Column width={11}>
                  <Header as='h1' textAlign='left'>
                    {bountyEntity.summary}
                    <Header.Subheader>
                      Created by {bountyEntity.createdBy} {bountyEntity.createdDate === null ? '' : `on ${new Date(bountyEntity.createdDate).toLocaleDateString('en-US', options)}`}
                    </Header.Subheader>
                  </Header>

                  <Header as='h2'>
                    Description
                  </Header>
                  <p>{bountyEntity.description !== null ? <i>No description available</i> : bountyEntity.description}</p>
                  <List size='large'>
                    <List.Item>
                      <Header as='h3'>
                        Difficulty: <Rating icon='star' rating={getDifficulty(bountyEntity.experience)} maxRating={3} />
                      </Header>
                    </List.Item>
                    <List.Item>Category: {bountyEntity.category === Category.FRONT_END && 'Front End' || bountyEntity.category === Category.BACKEND && 'Backend' || bountyEntity.category === Category.THIS && 'This'}</List.Item>
                    <List.Item>Type: {capitalizeFirst(bountyEntity.type)}</List.Item>
                    <List.Item as='a' href={bountyEntity.issueUrl}>Issue url</List.Item>
                  </List>

                  <Header as='h2'>
                    Expires in:
                  </Header>
                  <Grid>
                    <Grid.Column width={10}>
                      <div>
                        <Timer startDate={(bountyEntity?.expiryDate)} />
                      </div>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>

                <Grid.Column width={5}>
                  {
                    hasExpired(bountyEntity.expiryDate?.toString()) && <Label as='a' color='red' ribbon='right'>Expired</Label>
                    || bountyEntity?.status === Status.CLOSED && <Label as='a' color='red' ribbon='right'>Claimed</Label>
                    || bountyEntity?.status === Status.FUNDED && <Label as='a' color='red' ribbon='right'>Funded</Label>
                  }
                  <Container>
                    <Statistic horizontal>
                      <Statistic.Value>${bountyEntity.amount}</Statistic.Value>
                      <Statistic.Label>Bounty</Statistic.Label>
                    </Statistic>

                    <Header as='h2'>Sponsors</Header>

                    <List size='large' ordered divided animated verticalAlign='middle' >
                      {bountyEntity.fundings?.map((funding, index) => {
                        return (
                          <List.Item key={index}>
                            {`${funding.createdBy}: $${funding.amount}`}
                            {isAuthenticated && account.login === bountyEntity.createdBy ? (
                              <List.Content floated='right'>
                                <Icon name='edit' color='teal' />
                                <Icon name='trash' color='red' />
                              </List.Content>
                            ) : (
                              null
                            )}
                          </List.Item>
                        )
                      })}
                    </List>

                    <Modal
                      size={'small'}
                      open={open}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      trigger={
                        <Popup
                          size='small'
                          position='top center'
                          content='You need to be signed in to add funds'
                          disabled={isAuthenticated}
                          trigger={
                            <div>
                              <Button
                                color='teal'
                                content='Add funds'
                                icon='add'
                                labelPosition='right'
                                disabled={!isAuthenticated}
                              />
                            </div>
                          }
                        />
                      }
                    >
                      <Modal.Header>Add Funds</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Segment basic fluid attached>
                            <Grid>
                              <Grid.Column width='4'/>
                              <Grid.Column width='8'>
                                <Header>Add funds</Header>
                                <Form.Field
                                  required
                                  error={errors.amount?.message}>
                                  <label>Amount</label>
                                  <Controller
                                    as={Input}
                                    name="amount"
                                    placeholder="Amount"
                                    control={control}
                                    defaultValue={_.isEmpty(bountyEntity) ? bountyEntity.fundings[0].amount : null}
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
                                    control={control}
                                    options={modeOptions}
                                    defaultValue={_.isEmpty(bountyEntity) ? bountyEntity.fundings[0].mode : null}
                                  />
                                  {errors.mode && (
                                    <div className={"ui pointing above prompt label"}>
                                      {errors.mode?.message}
                                    </div>
                                  )}
                                </Form.Field>

                                <div>
                                  <Button color='black' onClick={() => setOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    color='teal'
                                    type="submit"
                                    disabled={props.fundingUpdating}
                                  >
                                    Add funds
                                  </Button>
                                </div>
                              </Grid.Column>
                              <Grid.Column width='4'/>
                            </Grid>
                          </Segment>
                        </Form>
                      </Modal.Content>
                    </Modal>

                  </Container>
                </Grid.Column>
              </Grid>
              <br/>
              {isAuthenticated && account.login === bountyEntity.createdBy ? (
                <div>
                  <Divider />
                  <Segment textAlign='center' basic>

                    <Button color='teal'>Edit</Button>
                    <Button negative>Close</Button>
                  </Segment>
                </div>
              ) : (
                null
              )}

              <Rail position='left' attached>
                <Sticky context={contextRef} pushing>
                  <Menu vertical>
                    {_.isEmpty(bountySlice()) ? (
                      !loading && (
                        <Menu.Item>
                          <i>No Bounties found</i>
                        </Menu.Item>
                      )
                    ) : (
                      bountySlice().map((bounty, index) => {
                        return (
                          <>
                            <Popup
                              wide='very'
                              position='top center'
                              mouseEnterDelay={500}
                              mouseLeaveDelay={500}
                              trigger={
                                <Menu.Item
                                  id={bounty.id?.toString()}
                                  name={bounty.summary}
                                  active={activeItem === bounty.id?.toString()}
                                  as='a' href={`/bounty/${bounty.id}`}
                                >
                                  <Header as='h3'>
                                    <Header.Content>
                                      {`${bounty.summary.slice(0, 15)}...`}
                                      <Header.Subheader>{bounty.description !== null ? <i>No description available</i> : bounty.description}</Header.Subheader>
                                    </Header.Content>
                                  </Header>
                                </Menu.Item>
                              }
                            >
                              <Header as='h3' content={bounty.summary} />
                              <p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
                              <span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
                              <br/>
                              <span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
                            </Popup>
                          </>
                        )
                      })
                    )}
                    <Menu.Item>
                      <Input
                        icon='search'
                        placeholder='Search bounties...'
                        onChange={(e, { value }) => setSearch(value)}
                        onKeyPress={startSearching}
                        value={search}
                      />
                    </Menu.Item>
                  </Menu>
                </Sticky>
              </Rail>
            </Segment>
          </Grid.Column>
        </Grid>
      </Ref>
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
