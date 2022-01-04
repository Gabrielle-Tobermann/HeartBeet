import { Button } from 'reactstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 75%;
`;

const DonationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Delivery = styled.div`
  font-size: 20px;
  margin-left: 3%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CardName = styled(Button)`
  background-color: #840749;
  border-color: #840749;
  font-size: 25px;
  &:hover {
    background-color: #fbc4ab;
  border-color: #fbc4ab;
  }
`;

export {
  CardContainer,
  DonationWrapper,
  Delivery,
  CardHeader,
  CardName
};
