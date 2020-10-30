import './home-header.scss';

import React, { useState , Component, useEffect} from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

// import { Home, Brand } from './header-components';
// import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Divider,
	Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
	Modal,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { getLoginUrl } from 'app/shared/util/url-utils';

const HomepageHeading = ({ mobile }) => (
	<Container text>
		<Header
			as='h1'
			content='Imagine-a-Company'
			inverted
			style={{
				fontSize: mobile ? '2em' : '4em',
				fontWeight: 'normal',
				marginBottom: 0,
				marginTop: mobile ? '1.5em' : '3em',
			}}
		/>
		<Header
			as='h2'
			content='Do whatever you want when you want to.'
			inverted
			style={{
				fontSize: mobile ? '1.5em' : '1.7em',
				fontWeight: 'normal',
				marginTop: mobile ? '0.5em' : '1.5em',
			}}
		/>
		<Button as={Link} to={'/login'} primary size='huge'>
			Get Started
			<Icon name='arrow right' />
		</Button>
	</Container>
)

HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
}

export interface IHeaderProps {
  isAuthenticated?: boolean;
	isAdmin?: any;
}

export const DesktopContainer = (props: IHeaderProps) => {
	const [state, setState] = useState({fixed: null})

	const hideFixedMenu = () => setState({ fixed: false })
	const showFixedMenu = () => setState({fixed: true})

	const { fixed } = state
	const { isAuthenticated, isAdmin} = props;

	return (
		<Visibility
			once={false}
			onBottomPassed={showFixedMenu}
			onBottomPassedReverse={hideFixedMenu}
		>
		<LoadingBar className="loading-bar" />
			<Segment
				inverted
				textAlign='center'
				style={isAdmin ? { margin: 'auto' } : { minHeight: 700, padding: '1em 0em' }}
				vertical
			>
				<Menu
					fixed={state.fixed ? 'top' : null}
					inverted={!fixed}
					pointing={!fixed}
					secondary={!fixed}
					size='large'
				>
					<Container>
						<Menu.Item as={Link} to={'/'} active>
							Home
						</Menu.Item>
						{ isAdmin ? (
							<Menu.Menu position='right'>
								<Menu.Item>
									<Button as={Link} to={'/logout'} inverted={!fixed} color={'red'}>Sign Out</Button>
								</Menu.Item>
							</Menu.Menu>
						) : (
							<>
								<Menu.Item as='a'>Work</Menu.Item>
								<Menu.Item as='a'>Company</Menu.Item>
								<Menu.Item as='a'>Careers</Menu.Item>
								<Menu.Item position='right'>
									{ isAuthenticated ? (
										<Button as={Link} to={'/logout'} inverted={!fixed} color={'red'}>Sign Out</Button>
									) : (
										<div>
											<Button as={Link} to={getLoginUrl()} inverted={!fixed}>
												Log in
											</Button>
											<Button as={Link} to={'/account/register'} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
												Sign Up
											</Button>
										</div>
									)}
								</Menu.Item>
							</>
						)}
					</Container>
				</Menu>
				{!isAdmin && <HomepageHeading />}
			</Segment>
		</Visibility>
	)
}

export const MobileHeader = (props: IHeaderProps) => {
	const [state, setState] = useState({ sidebarOpened: null });

	const handleSidebarHide = () => setState({ sidebarOpened: false })

	const handleToggle = () => setState({ sidebarOpened: true })

	const { sidebarOpened } = state
	const { isAuthenticated, isAdmin } = props;

	return (
		<Sidebar.Pushable>
		<LoadingBar className="loading-bar" />
			<Sidebar
				as={Menu}
				animation='overlay'
				inverted
				onHide={handleSidebarHide}
				vertical
				visible={sidebarOpened}
			>
				<Menu.Item as='a' active>
					Home
				</Menu.Item>
				{isAdmin ? (
					<div>
						<Menu.Item>
							<Button as={Link} to={'/logout'} inverted color={'red'}>Sign Out</Button>
						</Menu.Item>
					</div>
				) : (
					<div>
						<Menu.Item as='a'>Work</Menu.Item>
						<Menu.Item as='a'>Company</Menu.Item>
						<Menu.Item as='a'>Careers</Menu.Item>
						{isAuthenticated ? (
							<Menu.Item as={Link} to={'/logout'} color='red'>Sign out</Menu.Item>
						) : (
							<div>
								<Menu.Item as={Link} to={'/login'}>Log in</Menu.Item>
								<Menu.Item as={Link} to={'/account/register'}>Sign Up</Menu.Item>
							</div>
						)}
					</div>
				)}
			</Sidebar>

			<Sidebar.Pusher dimmed={sidebarOpened}>
				<Segment
					inverted
					textAlign='center'
					style={{ minHeight: 350, padding: '1em 0em' }}
					vertical
				>
					<Container>
						<Menu inverted pointing secondary size='large'>
							<Menu.Item onClick={handleToggle}>
								<Icon name='sidebar' />
							</Menu.Item>
							<Menu.Item position='right'>
								{ isAuthenticated ? (
									<Button as={Link} to={'/logout'} inverted color={'red'}>Sign Out</Button>
								) : (
									<div>
										<Button as={Link} to={'/login'} inverted>
											Log in
										</Button>
										<Button as={Link} to={'/account/register'} inverted style={{ marginLeft: '0.5em' }}>
											Sign Up
										</Button>
									</div>
								)}
							</Menu.Item>
						</Menu>
					</Container>
					<HomepageHeading mobile />
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	)
}
