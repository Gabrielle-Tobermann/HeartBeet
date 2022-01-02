import React from 'react';
import PropTypes from 'prop-types';
import NewUserModal from './NewUserModal';

function Home({ user, setUser }) {
  return (
    <div>
      <div>Welcome to HeartBeet</div>
       <NewUserModal
        user={user}
        setUser={setUser}
       />
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default Home;
