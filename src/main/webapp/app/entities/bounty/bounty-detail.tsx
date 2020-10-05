import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bounty.reducer';
import { Grid, Segment, Header, Container, Ref, Sticky, Statistic, Rating, List, Button } from 'semantic-ui-react';
import { calculateTimeLeft } from 'app/shared/util/date-utils';
import { createRef } from 'react';
import _ from 'lodash';
import { circleRadius, describeArc } from 'app/shared/util/component-utils';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyDetail = (props: IBountyDetailProps) => {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft('2021-11-06'));

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
        setTimeLeft(calculateTimeLeft('2021-11-06'));
    }, 1000)
  });

  const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
      <path fill="none" stroke="#333" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
  );

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    <div className='countdown-wrapper'>
      {timerComponents.push(
        timeLeft[interval] && (
          <div className='countdown-item'>
            <SVGCircle radius={circleRadius(timeLeft[interval], interval)} />
            {timeLeft[interval]}
            <span>{interval}</span>
          </div>
        )
      )}
    </div>
  });

  const contextRef = createRef<HTMLElement>()

  const square = { width: 175, height: 175 }

  const { bountyEntity } = props;
  return (<>
    <Ref innerRef={contextRef}>
      <Grid columns={2} style={{ padding: '8em 0em' }}>
        <Grid.Column width='14'>

          <Segment vertical>
            <Grid>
              <Grid.Row>
                <Grid.Column width={1}/>
                <Grid.Column width={10}>
                  <Container>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as='h1' textAlign='left'>
                            Summary
                            {/* bountyEntity.summary */}
                            <Header.Subheader>
                              Created by {/* bountyEntity.createdBy} on {bountyEntity.createdDate */}
                            </Header.Subheader>
                          </Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Header as='h4'>
                      Description
                    </Header>
                    <p>
                      {/* bountyEntity.description */}
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque enim modi pariatur ut suscipit distinctio mollitia amet, esse optio molestias porro nesciunt iusto voluptas earum culpa doloribus eius error excepturi!
                    </p>

                  </Container>

                  <Grid style={{ padding: '2em 0em' }}>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Segment>
                          <List size='large'>
                            <List.Item>Category: Frontend{/* bountyEntity.category */}</List.Item>
                            <List.Item>Type: Bug{/* bountyEntity.type */}</List.Item>
                          </List>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Container>
                          <Header as='h2'>
                            {/* bountyEntity.issue.issueId */}
                          </Header>

                          <Header as='h4'>
                            Description
                          </Header>

                          <p>
                            {/* bountyEntity.issue.description */}
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque enim modi pariatur ut suscipit distinctio mollitia amet, esse optio molestias porro nesciunt iusto voluptas earum culpa doloribus eius error excepturi!
                          </p>

                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                </Grid.Column>
                <Grid.Column width={4}>
                  <Container>
                    <Statistic horizontal>
                      <Statistic.Value>$250{/* bountyEntity.amount */}</Statistic.Value>
                      <Statistic.Label>Bounty</Statistic.Label>
                    </Statistic>
                    <Segment circular style={square}>
                      <Header as='h2'>
                        Difficulty!
                        <Rating icon='star' defaultRating={3} maxRating={3} />
                      </Header>
                    </Segment>
                    <Header as='h2'>Sponsors</Header>
                    <List size='large'>
                      <List.Item>John: $100</List.Item>
                      <List.Item>Paul: $75</List.Item>
                      <List.Item>Jane: $75</List.Item>
                      {/* bountyEntity.fundings.map((funding, index) => {
                        <List.Item>{funding.mode}</List.Item>
                      }) */}
                    </List>
                    <Link to={'fund/new'} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                      <Button
                        color='teal'
                        content='Add funds'
                        icon='add'
                        labelPosition='right'
                      />
                    </Link>
                  </Container>
                </Grid.Column>
                <Grid.Column width={1}/>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>

        <Grid.Column width={2}>
          <Sticky context={contextRef}>
            <Header as='h2' textAlign='center'>
              Expires in:
              <div>
                {timerComponents.length ? timerComponents : <span>Time&apos;s up!</span>}
              </div>
            </Header>
          </Sticky>
        </Grid.Column>
      </Grid>
    </Ref>
  </>);
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyEntity: bounty.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
