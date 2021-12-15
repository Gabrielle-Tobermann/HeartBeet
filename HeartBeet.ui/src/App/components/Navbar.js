import React from 'react';
import {
  Button,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../helpers/auth';

const Navbar = () => (
  <div>
    <div className="sidebar-header">
      <h3>HeartBeet</h3>
    </div>
    <div>
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={'/'}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'/feed'}>
            Donations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'/profile'}>
            Profile
          </NavLink>
        </NavItem>
        <Button onClick={signOutUser}>Sign Out</Button>
      </Nav>
    </div>
  </div>
);

export default Navbar;
