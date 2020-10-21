import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Card } from './Card/Card';
import CardAvatar from './Card/CardAvatar';
import { CardBody } from './Card/CardBody';
import style from './style';
import { Grid, Icon, Message, Segment, Table } from 'semantic-ui-react';
import { CardHeader } from './Card/CardHeader';
import CardIcon from './Card/CardIcon';
import { CardFooter } from './Card/CardFooter';

export interface IProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles(style)

export const ProfileDetail = (props: IProfileDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const classes = useStyles();

  const { profileEntity } = props;
  return (
    <div style={{ padding: '8em 0em' }}>
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={"content/images/jhipster_family_member_0_head-192.png"} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              {/* <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6> */}
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid columns={2}>
            <Grid.Column>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon name='warehouse' />
                  </CardIcon>
                  <p className={classes.cardCategory}>Revenue</p>
                  <h3 className={classes.cardTitle}>$34,245</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Icon name='calendar alternate outline' />
                    Last 24 Hours
                  </div>
                </CardFooter>
              </Card>
            </Grid.Column>
            <Grid.Column>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon name='info' />
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon name='tag' />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
            </Grid.Column>
          </Grid>
          <Message
            attached
            header='Claimed bounties'
            content='List of all claimed bounties'
          />
          <Segment basic attached padded='very'>
            <div>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill</Table.Cell>
                  <Table.Cell>Denied</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ profile }: IRootState) => ({
  profileEntity: profile.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
