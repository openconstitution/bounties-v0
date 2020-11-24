import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';

import { saveAccountSettings, reset } from './settings.reducer';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, Header, Menu, Segment, Image, List, Divider, Message, Form, TextArea, Input, Confirm, Dimmer, Icon } from 'semantic-ui-react';
import { IUser } from 'app/shared/model/user.model';
import { IProfile } from 'app/shared/model/profile.model';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  const [about, setAbout] = useState('');
  const [profilelink, setProfileLink] = useState('');
  const [githubEmail, setGithubEmail] = useState('');
  const [githubOrgName, setGithubOrgName] = useState('');

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dimmableActive, setDimmableActive] = useState(false);
  const [activeItem, setActiveItem] = useState('profile-settings');
  const [isProfileInfoEditMode, setIsProfileInfoEditMode] = useState(false);
  const [noneMessage] = useState('None Available, Please update your profile');

  useEffect(() => {
    return () => {
      props.reset();
    };
  }, []);

  const handleAboutChange = (e) => setAbout(e.target.value);

  const handleShow = () => setDimmableActive(true)
  const handleHide = () => setDimmableActive(false)

  const handleProfileSettingsSubmit = () => {
    const profile: IProfile = {
      ...props.account.profile,
      about, profilelink, githubEmail, githubOrgName
    };

    const accountSettings: IUser = {
      ...props.account, profile
    }

    props.saveAccountSettings(accountSettings);
  }

  const RenderProfileSettingsForm = (profileSettingsFormProps: any) => {
    return (
      <div>
        <Form>
          <Header as='h1' disabled>
            Basic Info
          </Header>
          <List vertical fluid>
            <List.Item>
              <Header as='h4'>
                Username
              </Header>
              <Message size='small'>
                {props.account.login || noneMessage}
              </Message>
            </List.Item>
            <List.Item>
              <Header as='h4'>
                Name
              </Header>
              <Message size='small'>
                {`${props.account.firstName} ${props.account.lastName}` || noneMessage}
              </Message>
            </List.Item>
            <List.Item>
              <Form.Field
                label="About"
                control={TextArea}
                placeholder='Tell us more about you...'
                // value={about}
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore: No overload matches this call
                // onChange={handleAboutChange}
                // defaultValue={props.account.profile?.about}
              />
            </List.Item>
          </List>

          <Divider />
          <Header as='h1' disabled>
            Github Info
          </Header>
          <Form.Field>
            <label>Profile Link</label>
            <Input
              placeholder="Profile Link"
              value={profilelink}
              onChange={(e, { value }) => setProfileLink(value)}
              defaultValue={props.account.profile?.profilelink}
            />
          </Form.Field>
          <Form.Field>
            <label>Github email</label>
            <Input
              placeholder="Github email"
              value={githubEmail}
              onChange={(e, { value }) => setGithubEmail(value)}
              defaultValue={props.account.profile?.githubEmail}
            />
          </Form.Field>
          <Form.Field>
            <label>Github org name</label>
            <Input
              placeholder="Github org name"
              value={githubOrgName}
              onChange={(e, { value }) => setGithubOrgName(value)}
              defaultValue={props.account.profile?.githubOrgName}
            />
          </Form.Field>
          <Button
            icon='save'
            color='teal'
            content='Save'
            /* disabled={updating} */
            onClick={() => setConfirmOpen(true)}
          />
          <Button
            basic
            color='red'
            content='Cancel'
            onClick={() => setIsProfileInfoEditMode(false)}
          />
        </Form>
      </div>
    );
  }

  const RenderProfileInfo = (profileInfoProps: any) => {
    return (
      <div>
        <Header as='h1' disabled>
          Basic Info
        </Header>
        <List vertical fluid>
          <List.Item>
            <Header as='h4'>
              Username
            </Header>
            <Message size='small'>
              {props.account.login || noneMessage}
            </Message>
          </List.Item>
          <List.Item>
            <Header as='h4'>
              Name
            </Header>
            <Message size='small'>
              {`${props.account.firstName} ${props.account.lastName}` || noneMessage}
            </Message>
          </List.Item>
          <List.Item>
            <Header as='h4'>
              About
            </Header>
            <Message size='small'>
              {props.account.profile?.about || noneMessage}
            </Message>
          </List.Item>
        </List>

        <Divider />
        <Header as='h1' disabled>
          Github Info
        </Header>
        <List vertical fluid>
          <List.Item>
            <Header as='h4'>
              Github Profile Link
            </Header>
            <Message size='small'>
              {props.account.profile?.profilelink || noneMessage}
            </Message>
          </List.Item>
          <List.Item>
            <Header as='h4'>
              Github Email
            </Header>
            <Message size='small'>
              {props.account.profile?.githubEmail || noneMessage}
            </Message>
          </List.Item>
          <List.Item>
            <Header as='h4'>
              Github Organisation Name
            </Header>
            <Message size='small' attached>
              {props.account.profile?.githubOrgName || noneMessage}
            </Message>
          </List.Item>
        </List>
        <Button
          color='teal'
          icon='pencil'
          content='Edit'
          onClick={() => setIsProfileInfoEditMode(true)}
        />
      </div>
    );
  }

  const dimmableContent = (
    <a>
      <Icon name='pencil' /> Edit
    </a>
  )

  const RenderComp = (compProps: { compFor: string }) => {
    if (compProps.compFor === 'profile-settings') {
      return (
        <div>
          <Grid columns='2'>
            <Grid.Column width='12'>
              {isProfileInfoEditMode ? (
                <RenderProfileSettingsForm />
              ) : (
                <RenderProfileInfo />
              )}
            </Grid.Column>
            <Grid.Column width='4'>
              <Dimmer.Dimmable
                blurring
                circular
                as={Image}
                size='small'
                dimmed={dimmableActive}
                onMouseEnter={handleShow}
                onMouseLeave={handleHide}
                dimmer={{ active: dimmableActive, content: dimmableContent }}
                src='content/images/jhipster_family_member_2_head-192.png'
                style={{ cursor: 'pointer' }}
              />              
            </Grid.Column>
          </Grid>
        </div>
      );
    } else if (compProps.compFor === 'wallet-settings') {
      return (<div>Wallet settings(Coming soon)</div>);
    } else {
      return (<div>Not availiable</div>);
    }
  }

  return (
    <div style={{ padding: '3em 2em' }}>
      <Header as='h2'>Settings</Header>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical pointing attached>
            <Menu.Item
              id='profile-settings'
              name='Profile Settings'
              active={activeItem === 'profile-settings'}
              onClick={(e, { id }) => setActiveItem(id)}
            />
            <Menu.Item
              id='wallet-settings'
              name='Wallet Settings'
              active={activeItem === 'wallet-settings'}
              onClick={(e, { id }) => setActiveItem(id)}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment attached padded='very'>
            <Confirm
              open={confirmOpen}
              cancelButton='Never mind'
              confirmButton="Yes I'm sure!
              "
              onCancel={() => setConfirmOpen(false)}
              onConfirm={handleProfileSettingsSubmit}
            />
            <RenderComp compFor={activeItem} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
