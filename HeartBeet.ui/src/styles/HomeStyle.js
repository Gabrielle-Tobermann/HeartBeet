import styled from 'styled-components';

const PhraseOne = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: #840749;
  width: 100%;
`;

const PhraseTwo = styled.div`
  font-weight: bold;
  font-size: 42px;
  color: #fbc4ab;
  width: 100%;
  margin-top: 5%;
`;

const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Image = styled.img`
  height: 100vh;
  width: auto; 
`;

const PhraseWrapper = styled.div`
  dixplay: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10%
`;

const Background = styled.div`
  background-image: url("https://media.gettyimages.com/photos/fresh-organic-beetroot-over-wooden-background-picture-id684252498?s=2048x2048");
`;

export {
  PhraseOne, PhraseTwo, DivWrapper, Image, Background, PhraseWrapper
};
