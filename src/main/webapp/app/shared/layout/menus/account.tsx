import React from 'react';
import { Button } from 'semantic-ui-react';

const accountMenuItemsAuthenticated = (
  <>
    {/* <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem> */}
    {/* <IconButton aria-label="show 4 new mails" color="inherit">
      <Badge badgeContent={4} color="secondary">
        <MailIcon />
      </Badge>
    </IconButton>
    <IconButton aria-label="show 17 new notifications" color="inherit">
      <Badge badgeContent={17} color="secondary">
        <NotificationsIcon />
      </Badge>
  </IconButton> */}
    {/* <IconButton
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit" >
        <AccountCircle />
    </IconButton> */}
  </>
);

const accountMenuItems = (
  <>
    <Button>Sign In</Button>
  </>
);

export const AccountMenu = ({ isAuthenticated = false}) => (
  <div>
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </div>
);

export default AccountMenu;
