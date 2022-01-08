import { Table } from 'reactstrap';
import styled from 'styled-components';

const ProfileHeader = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #5a0432;
  padding-top: 1%;
`;

const ProfileWrapper = styled.div`
  background-color: #ffeae1;
  min-height: 100vh;
`;

const UserType = styled.div`
  font-size: 22px;
  color: #fbc4ab
  font-weight: bold;
  margin: 1%;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTable = styled(Table)`
  width: 75%;
  margin-top: 5%;
  font-size: 20px;
  border-color: black;
`;

const StyledTr = styled.tr`
  border-color: white;
`;

const StyledTd = styled.td`
  &: hover {
    cursor: pointer
  }
`;

export {
  ProfileHeader,
  UserType,
  StyledTable,
  TableWrapper,
  ProfileWrapper,
  StyledTd,
  StyledTr
};
