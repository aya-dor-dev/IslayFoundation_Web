import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth";
import Layout from "./Layout/Layout";
import Home from './home/Home';

const App = () => {
  const loggedIn = useCallback(useSelector((state) => state.session.loggedIn));

  let layout = <Auth />;
  if (!loggedIn) {
    return <div className="App">{layout}</div>;
  }

  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/" component={Layout}/>
    </Switch>
  );
};

export default withRouter(App);
