import { Table } from 'reactstrap';
import styled from 'styled-components';

const ProfileHeader = styled.div`
  font-size: 30px;
  margin-top: 1%;
`;

const UserType = styled.div`
  font-size: 22px;
  color: #fbc4ab
  font-weight: bold;
  margin: 1%;
`;

const StyledTable = styled(Table)`
  margin: 5%;
`;

export { ProfileHeader, UserType, StyledTable };
