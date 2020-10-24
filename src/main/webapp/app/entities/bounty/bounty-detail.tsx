import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getSearchEntities, getEntities } from './bounty.reducer';
import { Grid, Segment, Header, Container, Image, Label, Statistic, Rating, List, Button, Menu, Input, Ref, Sticky, Rail, Placeholder, Popup } from 'semantic-ui-react';
import { createRef } from 'react';
import _ from 'lodash';
import Timer from './bounty-timer';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyDetail = (props: IBountyDetailProps) => {
	const [search, setSearch] = useState('');
  const  options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const [activeItem, setActiveItem] = useState(props.match.params.id);

  const { bountyEntity, bountyList, loading } = props;
  
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

    if (bountyList.slice(myIndex-2, myIndex+3).length >= 5) {
      return bountyList.slice(myIndex-2, myIndex+3);
    } else if (bountyList.slice(myIndex+2, myIndex-3).length >= 5) {
      return bountyList.slice(myIndex+2, myIndex-3);
    } else if (bountyList.slice(myIndex-4, myIndex+1).length >= 5) {
      return bountyList.slice(myIndex-4, myIndex+1);
    } else if (bountyList.slice(myIndex, myIndex+5).length >= 5) {
      return bountyList.slice(myIndex, myIndex+5);
    } else {
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

                  <Header as='h3'>
                    Description
                  </Header>
                  <p>{bountyEntity.description !== null ? <i>No description available</i> : bountyEntity.description}</p>
                  <List size='large'>
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
                  <Container textAlign='center'>
                    <Statistic horizontal>
                      <Statistic.Value>$250{/* bountyEntity.amount */}</Statistic.Value>
                      <Statistic.Label>Bounty</Statistic.Label>
                    </Statistic>
                      <Header as='h2'>
                        Difficulty: <Rating icon='star' rating={getDifficulty(bountyEntity.experience)} maxRating={3} />
                      </Header>
                    <Header as='h2'>Sponsors</Header>
                    <List size='large'>
                      {bountyEntity.fundings?.map((funding, index) => {
                        <List.Item key={index}>{`${funding.createdBy}: ${funding.amount}`}</List.Item>
                      })}
                    </List>
                    <Link to={'fund/new'}>
                      <Button
                        color='teal'
                        content='Add funds'
                        icon='add'
                        labelPosition='right'
                      />
                    </Link>
                  </Container>
                </Grid.Column>
              </Grid>

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

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyEntity: bounty.entity,
  bountyList: bounty.entities,
  loading: bounty.loading,
});

const mapDispatchToProps = {
  getEntity,
  getEntities,
  getSearchEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
