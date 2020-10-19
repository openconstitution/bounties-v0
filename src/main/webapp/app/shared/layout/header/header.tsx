// import './header.scss';

import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Translate, Storage } from 'react-jhipster';
import appConfig from 'app/config/constants';
import { AccountMenu } from '../menus';
import { Dropdown, Menu, Container, Image, Input, Segment, Button, Label, Icon } from 'semantic-ui-react';
import { getLoginUrl, getRegistrationUrl } from 'app/shared/util/url-utils';
import { NavLink as Link } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const trigger = (
  <span>
    <Image src={'content/images/jhipster_family_member_0_head-192.png' || 'props.account.imageUrl'} circular avatar />
    <span>Username</span>
  </span>
)

const Header = (props: IHeaderProps) => {

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <Label as='a' color='blue' ribbon>
        Community
      </Label>
    ) : null;

  return (
    <div style={{ backgroundColor: 'black' }}>
      <Menu size='large' borderless inverted stackable>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='content/images/logo-jhipster.png' style={{ marginRight: '1.5em' }} circular/>
            Bounties
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                inverted
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='Search bounties...'
              />
            </Menu.Item>
            {props.isAdmin && (
              <Dropdown item text='Administration'>
                <Dropdown.Menu>
                  <Dropdown.Item icon="eye" as='a' href="/admin/tracker" text="User tracker"/>
                  <Dropdown.Item icon="tachometer alternate" as='a' href="/admin/metrics" text="Metrics"/>
                  <Dropdown.Item icon="heart" as='a' href="/admin/health" text="Health"/>
                  <Dropdown.Item icon="list" as='a' href="/admin/configuration" text="Configuration"/>
                  <Dropdown.Item icon="bell" as='a' href="/admin/audits" text="Audits"/>
                  <Dropdown.Item icon="tasks" as='a' href="/admin/logs" text="Logs"/>
                  <Dropdown.Item icon="book" as='a' href="/admin/docs" text="Swagger docs"/>
                </Dropdown.Menu>
              </Dropdown>

            )}
            <Menu.Item>
              {props.isAuthenticated ? (
                  <Button negative as={Link} to='/logout'>
                    Sign Out
                  </Button>
                ) : (
                  <Button as='a' href={getLoginUrl()}>
                    Sign In
                  </Button>
                )
              }
            </Menu.Item>
            <Dropdown item trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item>Notifications (Beta)</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
      <LoadingBar className="loading-bar" />
    </div>
  );
}

export default Header;
