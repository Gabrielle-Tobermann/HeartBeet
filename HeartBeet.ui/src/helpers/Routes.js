import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../App/components/Home';
import Profile from '../App/components/Profile';
import Feed from '../App/components/Feed';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (remainder) => (user
    ? (<Component {...remainder} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: remainder.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};
function Routes({ user, setUser }) {
  return (
    <div>
      <Switch>
        <Route
        exact path='/'
        component={() => <Home
          user={user}
          setUser={setUser}
          />
        }
        />
        <PrivateRoute
        exact path='/profile'
        component={() => <Profile
        user={user}
        />}
        user={user}
        />
        <PrivateRoute
        exact path='/feed'
        component={Feed}
        user={user}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default Routes;
