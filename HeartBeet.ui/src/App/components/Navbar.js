import React from 'react';
import {
  Button,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signInUser, signOutUser } from '../../helpers/auth';

const Navbar = ({ user }) => (
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
        {
          user
            ? <Button onClick={signOutUser}>Sign Out</Button>
            : <Button onClick={signInUser}>Sign In</Button>
        }
      </Nav>
    </div>
  </div>
);

Navbar.propTypes = {
  user: PropTypes.any
};

export default Navbar;
