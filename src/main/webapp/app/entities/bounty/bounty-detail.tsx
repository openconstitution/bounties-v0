import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bounty.reducer';
import { Grid, Segment, Header, Container, Label, Image, Statistic, Rating, List, Button } from 'semantic-ui-react';
import { createRef } from 'react';
import _ from 'lodash';
import Timer from './bounty-timer';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyDetail = (props: IBountyDetailProps) => {

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bountyEntity } = props;
  return (
    <div style={{ padding: '8em 0em' }}>
      <Segment basic>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Container text>
                  <Header as='h1' textAlign='left'>
                    Summary
                    {/* bountyEntity.summary */}
                    <Header.Subheader>
                      Created by {/* bountyEntity.createdBy} on {bountyEntity.createdDate */}
                    </Header.Subheader>
                  </Header>

                  <Header as='h4'>
                    Description
                  </Header>
                  <p>
                    {/* bountyEntity.description */}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque enim modi pariatur ut suscipit distinctio mollitia amet, esse optio molestias porro nesciunt iusto voluptas earum culpa doloribus eius error excepturi!
                  </p>
                  
                  <List size='large'>
                    <List.Item>Category: Frontend{/* bountyEntity.category */}</List.Item>
                    <List.Item>Type: Bug{/* bountyEntity.type */}</List.Item>
                    <List.Item as={'a'}>Issue Link</List.Item>
                  </List>
                </Container>
              </Grid.Column>
              <Grid.Column fluid width={4}>
                <Segment raised>
                  <Label as='a' color='red' ribbon='right'>Claimed</Label>
                  <Container textAlign='center'>
                    <Statistic horizontal>
                      <Statistic.Value>$250{/* bountyEntity.amount */}</Statistic.Value>
                      <Statistic.Label>Bounty</Statistic.Label>
                    </Statistic>
                      <Header as='h2'>
                        Difficulty: <Rating icon='star' defaultRating={3} maxRating={3} />
                      </Header>
                    <Header as='h2'>Sponsors</Header>
                    <List size='large'>
                      <List.Item>John: $100</List.Item>
                      <List.Item>Paul: $75</List.Item>
                      <List.Item>Jane: $75</List.Item>
                      {/* bountyEntity.fundings.map((funding, index) => {
                        <List.Item>{funding.mode}</List.Item>
                      }) */}
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
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={4}>
                <Header as='h2'>
                  Expires in:
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <div>
                  <Timer startDate={"2020-12-12"} />
                </div>
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
  </div>);
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyEntity: bounty.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
