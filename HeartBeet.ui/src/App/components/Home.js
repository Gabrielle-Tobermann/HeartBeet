import React from 'react';
import PropTypes from 'prop-types';
import NewUserModal from './NewUserModal';
import {
  DivWrapper,
  Image,
  PhraseOne,
  PhraseTwo,
  PhraseWrapper,
} from '../../styles/HomeStyle';

function Home({ user, setUser }) {
  return (
    <div>
       <NewUserModal
        user={user}
        setUser={setUser}
       />
      <DivWrapper>
        <PhraseWrapper>
          <PhraseOne>Stop wasting.</PhraseOne>
          <PhraseTwo>Click buttons and donate.</PhraseTwo>
        </PhraseWrapper>
        <Image src="https://media.gettyimages.com/photos/person-holding-a-radish-picture-id74077291?k=20&amp;m=74077291&amp;s=612x612&amp;w=0&amp;h=lEzNb6CyGlmm2qWx4-WEO6N11XOjrFdF0sqRIYEKWqE=" alt="person holding a radish - beets stock pictures, royalty-free photos &amp; images" width="407" height="612" loading="lazy"/>
      </DivWrapper>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default Home;
