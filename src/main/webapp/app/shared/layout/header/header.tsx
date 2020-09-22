import './header.scss';

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoadingBar from 'react-redux-loading-bar';
import { Translate, Storage } from 'react-jhipster';
import { SearchItem } from '../menus';
import appConfig from 'app/config/constants';
import { AccountMenu } from '../menus';
import { Dropdown, Menu, Container, Image, Visibility, Segment, Button, Label } from 'semantic-ui-react';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

const Header = (props: IHeaderProps) => {

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <Label as='a' color='blue' ribbon>
        Community
      </Label>
    ) : null;

  return (
    <div>
      <Menu borderless inverted pointing>
        <Container>
          <Menu.Item>
            <Image size='mini' src='/logo.png' />
          </Menu.Item>
          <Menu.Item header>Bounties</Menu.Item>
          <Menu.Item as='a' fitted>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item position='right'>
            <Button as='a'>
              Log in
            </Button>
            <Button as='a' primary style={{ marginLeft: '0.5em' }}>
              Sign Up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
      <LoadingBar className="loading-bar" />
    </div>

    // <div>
    //   {renderDevRibbon()}
    //   <LoadingBar className="loading-bar" />
    //   <Menu fixed='top' inverted>
    //     <Container>
    //       <Menu.Item as='a' header>
    //         <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
    //         Bounties
    //       </Menu.Item>
    //       <Menu.Item as='a'>Home</Menu.Item>

    //       <Dropdown item simple text='Dropdown'>
    //         <Dropdown.Menu>
    //           <Dropdown.Item>List Item</Dropdown.Item>
    //           <Dropdown.Item>List Item</Dropdown.Item>
    //           <Dropdown.Divider />
    //           <Dropdown.Header>Header Item</Dropdown.Header>
    //           <Dropdown.Item>
    //             <i className='dropdown icon' />
    //             <span className='text'>Submenu</span>
    //             <Dropdown.Menu>
    //               <Dropdown.Item>List Item</Dropdown.Item>
    //               <Dropdown.Item>List Item</Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown.Item>
    //           <Dropdown.Item>List Item</Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </Container>
    //   </Menu>
    // </div>
  );
}

export default Header;

  // return (
  //   <div id="app-header">
  //     {renderDevRibbon()}
  //     <LoadingBar className="loading-bar" />
  //     <AppBar className="bg-dark" position="static">
  //       <Toolbar variant="dense">
  //         {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  //           <MenuIcon />
  //         </IconButton> */}
  //         <Typography className={classes.title} variant="h6" noWrap>
  //           <span className="brand-title">
  //             <Translate contentKey="global.title">Bounties</Translate>
  //           </span>
  //           <span className="navbar-version">{appConfig.VERSION}</span>
  //         </Typography>
  //         <SearchItem isAuthenticated={props.isAuthenticated} />

  //         <div className={classes.grow} />
  //         <div className={classes.sectionDesktop} />
  //           <AccountMenu isAuthenticated={props.isAuthenticated} />
  //         <div />
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );
