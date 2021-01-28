import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/bounties">
      Bounties
    </MenuItem>
    <MenuItem icon="asterisk" to="/bounty">
      Bounty
    </MenuItem>
    <MenuItem icon="asterisk" to="/fund">
      Funding
    </MenuItem>
    <MenuItem icon="asterisk" to="/issue">
      Issue
    </MenuItem>
    <MenuItem icon="asterisk" to="/profile">
      Profile
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
