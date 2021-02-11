// import './header.scss';

import React, { Children, useState } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { NavLink as Link } from 'react-router-dom';
import { getLoginUrl } from 'app/util/url-utils';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  account: any;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const trigger = (username: any) => (
  <span>
    {/* <Image src={'content/images/jhipster_family_member_0_head-192.png' || 'props.account.imageUrl'} circular avatar /> */}
    <span>{username}</span>
  </span>
)

export const DesktopHeader = (props: IHeaderProps) => {

  return (
    <div>
      {/* <Menu size='large' borderless inverted stackable fixed='top'>
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
              <Dropdown item trigger={trigger(props.account.login)}>
                <Dropdown.Menu>
                  <Dropdown.Item>Notifications(Beta)</Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/${props.account.login}`}>Profile</Dropdown.Item>
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
      </Menu> */}
    </div>
  );
}

export const MobileHeader = (props: IHeaderProps) => {

  const [state, setState] = useState({ sidebarOpened: null });

	const handleSidebarHide = () => setState({ sidebarOpened: false })

	const handleToggle = () => setState({ sidebarOpened: true })

	const { sidebarOpened } = state

  return (
    <div>
      {/* <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
          width='thin'
        >
        {props.isAdmin && (
          <Menu.Menu>
            <List>
              <List.Item>
                Administration
                <List.List>
                  <List.Item as='a' href="/admin/tracker">
                    <List.Icon name='eye' />
                    <List.Content>User tracker</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/metrics">
                    <List.Icon name='tachometer alternate' />
                    <List.Content>Metrics</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/health">
                    <List.Icon name='heart' />
                    <List.Content>Health</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/configuration">
                    <List.Icon name='list' />
                    <List.Content>Configuration</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/audits">
                    <List.Icon name='bell' />
                    <List.Content>Audits</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/logs">
                    <List.Icon name='tasks' />
                    <List.Content>Logs</List.Content>
                  </List.Item>
                  <List.Item as='a' href="/admin/docs">
                    <List.Icon name='book' />
                    <List.Content>Swagger docs</List.Content>
                  </List.Item>
                </List.List>
              </List.Item>
            </List>
          </Menu.Menu>
        )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 150, padding: '0em 0em' }}
            vertical
          >
            <Container fluid style={{ backgroundColor: 'black' }}>
              <Menu inverted borderless size='tiny'>
                {props.isAdmin ? (
                  <Menu.Item onClick={handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                ) : (
                  <Menu.Item as={'a'} href='/' header>
                    <Image size='mini' src='content/images/logo-jhipster.png' style={{ marginRight: '1.5em' }} circular/>
                    Bounties
                  </Menu.Item>
                )}
                <Menu.Item position='right'>
                  {props.isAuthenticated ? (
                    <Dropdown item trigger={trigger(props.account.login)}>
                      <Dropdown.Menu>
                        <Dropdown.Item>Notifications(Beta)</Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/${props.account}`}>Profile</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item as={Link} to='/logout'>Sign Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Menu.Item>
                      <Button as='a' href={getLoginUrl()}>
                        Sign In
                      </Button>
                    </Menu.Item>
                  )}
                </Menu.Item>
              </Menu>
            </Container>

            <Link to={`/new`}>
              <Button
                color='teal'
                content='Create New Bounty'
                icon='add'
                labelPosition='left'
              />
            </Link>
                    
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable> */}
    </div>
  );
}

export default {DesktopHeader, MobileHeader};
