import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Checkout from './Checkout/Checkout';
import LoginLinks from './LoginLinks/LoginLinks';

const Loading = () => (<div>loading....</div>);

const AuthRoutes = () => {
  return (
      <div>
        <Switch>
          <Route
            path="/auth/callback"
            render={() => <Loading />}
          />
          <Route
            path="/checkout"
            render={() => <Checkout />}
          />
          <Route
            path="/"
            render={() => <LoginLinks />}
          />
        </Switch>
      </div>
  );
}

export default AuthRoutes;
