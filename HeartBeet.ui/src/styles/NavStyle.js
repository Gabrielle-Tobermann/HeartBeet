import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const NavWrapper = styled.div`
  background-color: #840749;
  color: white;
  width: 15%;
`;

const StyledLink = styled(NavLink)`
  color: white;
  font-size: 22px;
  padding-top: 10%;
  padding-bottom: 10%;
  &:hover {
    font-weight: bold;
    color: #fbc4ab;
    text-decoration: none;
  }
`;

const NavTitle = styled.div`
  color: #fbc4ab;
  font-weight: bold;
  font-size: 30px;
`;

const AuthButton = styled(Button)`
  background-color: white;
  border: white;
  color: #840749;
  width: fit-content;
  &:hover {
    background-color: #fbc4ab 
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

export {
  NavWrapper,
  StyledLink,
  NavTitle,
  AuthButton,
  ButtonWrapper
};
