import React from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signInUser, signOutUser } from '../../helpers/auth';
import {
  AuthButton,
  ButtonWrapper,
  NavTitle,
  StyledLink
} from '../../styles/NavStyle';

const Navbar = ({ user }) => (
  <div>
    <div className="sidebar-header">
      <NavTitle>HeartBeet</NavTitle>
    </div>
    <div>
      <Nav vertical className="list-unstyled pb-3">
          <StyledLink tag={Link} to={'/'}>
            HOME
          </StyledLink>
          <StyledLink tag={Link} to={'/feed'}>
            DONATIONS
          </StyledLink>
          <StyledLink tag={Link} to={'/profile'}>
            PROFILE
          </StyledLink>
          <ButtonWrapper>
          {
          user
            ? <AuthButton onClick={signOutUser}>Sign Out</AuthButton>
            : <AuthButton onClick={signInUser}>Sign In</AuthButton>
          }
          </ButtonWrapper>
      </Nav>
    </div>
  </div>
);

Navbar.propTypes = {
  user: PropTypes.any
};

export default Navbar;
