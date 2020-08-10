import './header.scss';

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LoadingBar from 'react-redux-loading-bar';
import { Translate, Storage } from 'react-jhipster';
import { SearchItem } from '../menus';
import appConfig from 'app/config/constants';
import { Button, Typography, Badge, IconButton } from '@material-ui/core';
import { AccountMenu } from '../menus';

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
  const classes = useStyles();

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <AppBar className="bg-dark" position="static">
        <Toolbar variant="dense">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            <span className="brand-title">
              <Translate contentKey="global.title">Bounties</Translate>
            </span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </Typography>
          <SearchItem isAuthenticated={props.isAuthenticated} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          <div />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
