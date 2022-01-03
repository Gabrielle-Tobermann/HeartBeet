import React from 'react';
import PropTypes from 'prop-types';
import NewUserModal from './NewUserModal';
import {
  DivWrapper,
  Image,
  PhraseOne,
  PhraseTwo
} from '../../styles/HomeStyle';

function Home({ user, setUser }) {
  return (
    <div>
       <NewUserModal
        user={user}
        setUser={setUser}
       />
      <DivWrapper>
        <PhraseOne>Stop wasting.</PhraseOne>
        <Image className="MosaicAsset-module__thumb___epLhd" src="https://media.gettyimages.com/photos/fresh-organic-beetroot-over-wooden-background-picture-id684252498?k=20&amp;m=684252498&amp;s=612x612&amp;w=0&amp;h=G0EiGo4bVmoW5WnaDUEtLGBG7lm7iMYVxQG6_ZC8Trk=" alt="fresh organic beetroot over wooden background - beets stock pictures, royalty-free photos &amp; images" width="612" height="408"></Image>
      </DivWrapper>
      <DivWrapper>
        <Image src="https://media.gettyimages.com/photos/healthy-drink-beet-juice-on-rustic-wooden-table-picture-id1160244902?k=20&amp;m=1160244902&amp;s=612x612&amp;w=0&amp;h=yTAEYpoXliQArGgh2flhGFh0eMQPkW3IKz3kryqTqhU=" alt="healthy drink: beet juice on rustic wooden table - beets stock pictures, royalty-free photos &amp; images" width="612" height="408"></Image>
        <PhraseTwo>Donate with one click.</PhraseTwo>
      </DivWrapper>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default Home;
