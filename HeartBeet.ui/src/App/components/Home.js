import React from 'react';
import PropTypes from 'prop-types';
import { signInUser } from '../../helpers/auth';
import NewUserModal from './NewUserModal';

function Home({ user, setUser }) {
  return (
    <div>
       <button onClick={signInUser}>Sign In</button>
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
