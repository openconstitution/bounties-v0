import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { AccountCircle } from '@material-ui/icons';
import { Badge, Collapse, fade, Menu, MenuItem } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 70
  },
  brand: {
    lineHeight: 1,
    marginRight: 'auto'
  },
  link: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  linkBrand: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  linkBrandSmall: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      display: 'inline-block',
    }
  },
  primaryAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  iconWrapper: {
    minWidth: 40,
  },
  icon: {
    color: theme.palette.text.hint
  },
  drawerContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    width: 300,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navigation(props) {
  const classes = useStyles();
  const [subListOpen, setSubListOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const content = {
    'brand': { image: 'content/images/nereus-light.png', width: 110 },
    'profile-option1': 'Profile',
    'profile-option2': 'My Account',
    'menu-option1': 'Messages',
    'menu-option2': 'Notifications',
    'menu-option3': 'Profile',
    'primary-action': 'Sign out',
    ...props.content
  };

  let brand;

  if (content.brand.image) {
    brand = <img src={ content.brand.image } alt="" width={ content.brand.width } />;
  } else {
    brand = content.brand.text || '';
  }

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open });
  };

  const handleSubListOpenClick = () => {
    setSubListOpen(!subListOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{content['profile-option1']}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{content['profile-option2']}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{content['primary-action']}</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" color="inherit">
      <Toolbar className={classes.toolbar}>
        <Link href="#" color="primary" underline="none" variant="h5" className={classes.brand}>
          {brand}
        </Link>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {/* <div className={classes.grow} /> */}
        {/* <Button variant="contained" color="secondary" className={classes.primaryAction}>{content['primary-action']}</Button> */}
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>

      {renderMenu}

      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <Box mb={1} ml={2} pb={2} border={1} borderTop={0} borderLeft={0} borderRight={0} borderColor="background.emphasis">
            <Link href="#" color="primary" underline="none" variant="h5" className={classes.linkBrand}>
              {brand}
            </Link>
          </Box>
          <List>
            <ListItem button key={content['menu-option1']}>
              <ListItemIcon className={classes.iconWrapper}>
                <Badge badgeContent={4} color="secondary">
                  <MailIcon className={classes.icon} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={content['menu-option1']} />
            </ListItem>
            <ListItem button key={content['menu-option2']}>
              <ListItemIcon className={classes.iconWrapper}>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon className={classes.icon} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={content['menu-option2']} />
            </ListItem>
            <ListItem button key={content['menu-option3']} onClick={handleSubListOpenClick}>
              <ListItemIcon className={classes.iconWrapper}>
                <AccountCircle className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={content['menu-option3']} />
              {subListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={subListOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>                  
                  <ListItemText primary={content["profile-option1"]} />
                </ListItem>
                <ListItem button className={classes.nested}>                  
                  <ListItemText primary={content["profile-option2"]} />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Box mt={1} ml={2} pt={3} border={1} borderBottom={0} borderLeft={0} borderRight={0} borderColor="background.emphasis">
            <Button variant="contained" color="secondary" fullWidth>{content['primary-action']}</Button>
          </Box>
        </div>
      </Drawer>
    </AppBar>
  );
}
