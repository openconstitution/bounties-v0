import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/bounty">
      <Translate contentKey="global.menu.entities.bounty" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/funding">
      <Translate contentKey="global.menu.entities.funding" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/issue">
      <Translate contentKey="global.menu.entities.issue" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profile">
      <Translate contentKey="global.menu.entities.profile" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
