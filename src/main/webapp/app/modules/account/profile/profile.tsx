import style from './styles/style';

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import { NavLink as Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profile.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntitiesByFilter as getClaimedBounties } from 'app/entities/bounty/bounty.reducer'

import { Card } from './Card/Card';
import CardAvatar from './Card/CardAvatar';
import { CardBody } from './Card/CardBody';
import { Button, Grid, Header, Icon, List, Menu, Message, Modal, Rating, Segment, Table } from 'semantic-ui-react';
import { CardHeader } from './Card/CardHeader';
import CardIcon from './Card/CardIcon';
import { CardFooter } from './Card/CardFooter';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { createMedia } from '@artsy/fresnel';
import _ from 'lodash';

export interface IProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

const useStyles = makeStyles(style)

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

export const ProfileDetail = (props: IProfileDetailProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    props.getSession();
    props.getEntity(props.match.params.login);
    props.getClaimedBounties({status: Status.CLAIMED, hunter: props.match.params.login});
    setOpen(_.isEmpty(props.profileEntity.profile))
  }, []);

  const { profileEntity, isAuthenticated } = props;

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

  const classes = useStyles();

  const DesktopProfile = () => {
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Card profile>
            <CardAvatar profile>
              <a href={`#${profileEntity.login}`} onClick={e => e.preventDefault()}>
                <img src={"content/images/no-user.png"} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{`${profileEntity.firstName} ${profileEntity.lastName}`}</h4>
              <h6 className={classes.cardCategory}>{profileEntity.profile?.githubOrgName}</h6>
              <p className={classes.description}>
                {profileEntity.profile?.about}
                <br/>
                {isAuthenticated ? (
                  <Button color='teal' as={Link} to={`/${profileEntity.login}/settings`} >Go to Settings</Button>
                ) : (
                  <Button color='teal'>Vote</Button>
                )}
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
                    <Icon name='users' />
                  </CardIcon>
                  <p className={classes.cardCategory}>Votes</p>
                  <h3 className={classes.cardTitle}>{profileEntity.profile?.votes || 0}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Icon name='users' />
                    All my followers
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
                  <h3 className={classes.cardTitle}>{props.claimedBountyList.length}</h3>
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
            <Table selectable celled color='black'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={12}>Summary</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Category</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Difficulty</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {props.claimedBountyList.map((bounty, i) => (
                  <>
                    <Table.Row>
                      <Table.Cell>
                        <Link to={`/${bounty.id}`}>
                          <Header as='h4'>
                            <Header.Content>
                              #{bounty.id} - {bounty.summary}
                              <Header.Subheader>
                                <List bulleted horizontal size='tiny'>
                                  <List.Item>
                                    Created by {bounty.createdBy}
                                  </List.Item>
                                  <List.Item>
                                    on {bounty.createdDate === null ? '' : `${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}
                                  </List.Item>
                                </List>
                              </Header.Subheader>
                            </Header.Content>									
                          </Header>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}
                      </Table.Cell>
                      <Table.Cell>
                        <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} />
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
              </Table.Body>
            </Table>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  const MobileProfile = () => {
    return (
      <div>
        <Card profile>
          <CardAvatar profile>
            <a href={`#${profileEntity.login}`} onClick={e => e.preventDefault()}>
              <img src={profileEntity.imageUrl || "content/images/no-user.png"} alt="..." />
            </a>
          </CardAvatar>
          <CardBody profile>
            <Header>
              <Header.Content>
                <h4 className={classes.cardTitle}>{`${profileEntity.firstName} ${profileEntity.lastName}`}</h4>
                <h6 className={classes.cardCategory}>{profileEntity.profile?.githubOrgName}</h6>
              </Header.Content>
              <Header.Subheader>
                <p className={classes.description}>
                  <br/>
                  {profileEntity.profile?.about}
                  <br/>
                  {isAuthenticated ? (
                    <Button color='teal' as={Link} to={`/${profileEntity.login}/settings`}>Go to Settings</Button>
                  ) : (
                    <Button color='teal'>Vote</Button>
                  )}
                </p>
              </Header.Subheader>
            </Header>
          </CardBody>
        </Card>
      
        <br/>
        
        <Grid columns={2}>
          <Grid.Column>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon name='users' />
                </CardIcon>
                <p className={classes.cardCategory}>Votes</p>
                <h3 className={classes.cardTitle}>{profileEntity.profile?.votes || 0}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon name='users' />
                  All my followers
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
                <h3 className={classes.cardTitle}>{props.claimedBountyList.length}</h3>
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
          <Table selectable celled color='black'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={16}>Summary</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.claimedBountyList.map((bounty, i) => (
                <>
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`/${bounty.id}`}>
                        <Header as='h4'>
                          <Header.Content>
                            #{bounty.id} - {bounty.summary}
                            <Header.Subheader>
                              <List bulleted horizontal size='tiny'>
                                <List.Item>
                                  Created by {bounty.createdBy}
                                </List.Item>
                                <List.Item>
                                  on {bounty.createdDate === null ? '' : `${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}
                                </List.Item>
                              </List>
                            </Header.Subheader>
                          </Header.Content>									
                        </Header>
                        <span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
                        <br/>
                        <span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </Table.Body>
          </Table>
          </div>
        </Segment>
      </div>
    );
  }

  return (
    <Segment basic style={{ padding: '5em 5em' }} vertical>
      <br/>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={16}>
            {isAuthenticated ? (
              <Modal
                open={open}
                header='Reminder!'
                content='Please update your profile to fully benefit from the platform'
                actions={[
                  {key: 'snooze', content: 'Snooze', onClick: () => setOpen(false)},
                  { key: 'done', content: 'Go to settings', as: Link, to: `/${profileEntity.login}/settings`, color: 'teal' }]}
              />
            ) : (null)}
            
            <div>
              <Menu text floated>
                <Menu.Item position='left' as={Link} to='/'>
                  <h3><Icon name='arrow left' />Home</h3>
                </Menu.Item>
              </Menu>
              {isAuthenticated && (
                <Menu text floated='right'>
                  <Menu.Item position='right' as={Link} to='/logout'>
                    <h3>Logout <Icon name='sign-out alternate' /></h3>
                  </Menu.Item>
                </Menu>
              )}
            </div>
            <br/>
            <MediaContextProvider>
              <Media greaterThan='mobile'>
                <DesktopProfile/>
              </Media>
              <Media at='mobile'>
                <MobileProfile/>
              </Media>
            </MediaContextProvider>      
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = ({ profile, bounty, authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  profileEntity: profile.entity,
  claimedBountyList: bounty.entities,
});

const mapDispatchToProps = {
  getEntity,
  getSession,
  getClaimedBounties
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
