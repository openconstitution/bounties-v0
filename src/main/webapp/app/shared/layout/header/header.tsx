// import './header.scss';

import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Dropdown, Menu, Container, Image, Input, Button, Label } from 'semantic-ui-react';
import { NavLink as Link } from 'react-router-dom';
import { getLoginUrl } from 'app/shared/util/url-utils';

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
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  return (
    <div>
      <Menu size='large' borderless inverted stackable fixed='top'>
        <Container>
          <Menu.Item as={Link} to='/' header>
            <Image size='mini' src='content/images/logo-jhipster.png' style={{ marginRight: '1.5em' }} circular/>
            Bounties
          </Menu.Item>

          <Menu.Menu position='right'>
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

            {props.isAuthenticated ? (
              <Dropdown item trigger={trigger}>
                <Dropdown.Menu>
                  <Dropdown.Item>Notifications (Beta)</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/logout'>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Menu.Item>
                <Button as='a' href='/oauth2/authorization/oidc'>
                  Sign In
                </Button>
              </Menu.Item>
            )}
            
          </Menu.Menu>
        </Container>
      </Menu>
      <LoadingBar className="loading-bar" />
    </div>
  );
}

export default Header;
