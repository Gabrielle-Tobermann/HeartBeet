import { Button, Card } from 'reactstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 75%;
`;

const StyledCard = styled(Card)`
  margin: 5%;
  border-color: white;
  background-color: white;
`;

const DonationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  background-color: #ffeae1;
`;

const Delivery = styled.div`
  font-size: 20px;
  margin-left: 3%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DatePosted = styled.div`
  align-self: center;
  font-size: 20px;
`;

const CardName = styled(Button)`
  background-color: white;
  color: #840749;
  border-color: #840749;
  border-left-style: none;
  border-right-style: none;
  font-size: 18px;
  &:hover {
    background-color: #fbc4ab;
    border-color: #fbc4ab;
  }
  &:focus {
    background-color: #840749;
    border-color: #840749;
    box-shadow: #840749;
  }
`;

const Item = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Location = styled.a`
  font-size: 18px;
  color: black;
  &:hover {
    color: #840749;
    font-weight: bold;
  }
`;

const NameContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;

const ItemDiv = styled.div`
  font-size: 20px;
  margin: 2%;
`;

const AddDonation = styled(Button)`
background-color: white;
border-color: #840749;
color: #840749;
font-size: 18px;
&:hover {
  background-color: #fbc4ab;
  border-color: #fbc4ab;
}
&:focus {
  background-color: #840749;
  border-color: #840749;
`;

const FieldButton = styled(Button)`
  margin: 2%;
  width: fit-content;
  background-color: white;
border-color: #840749;
color: #840749;
font-size: 18px;
&:hover {
  background-color: #fbc4ab;
  border-color: #fbc4ab;
}
&:focus {
  background-color: #840749;
  border-color: #840749;
`;

export {
  CardContainer,
  DonationWrapper,
  Delivery,
  CardHeader,
  CardName,
  DatePosted,
  NameContainer,
  StyledCard,
  Item,
  Location,
  ItemDiv,
  AddDonation,
  FieldButton
};
