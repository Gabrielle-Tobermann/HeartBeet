import styled from 'styled-components';

const PhraseOne = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: #840749;
  width: 50%;
`;

const PhraseTwo = styled.div`
  font-weight: bold;
  font-size: 42px;
  color: #fbc4ab;
  width: 50%;
`;

const DivWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Image = styled.img`
  width: 50%;
  hieght: auto;
`;

export {
  PhraseOne, PhraseTwo, DivWrapper, Image
};
