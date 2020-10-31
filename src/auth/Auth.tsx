import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Auth.module.scss";
import { login, attemptAutoLogin } from "./store/actions";
import Card from "../UI/Card/Card";
import { LS_TOKEN } from "./store/sagas";
import Button from "../UI/Button/Button";
import { RootState } from "../store/rootReducer";

const Auth = () => {
  const dispatch = useDispatch();
  const { loggingIn, error } = useSelector((state: RootState) => state.session);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem(LS_TOKEN);

  useEffect(() => {
    if (!loggingIn && token && !error) {
      dispatch(attemptAutoLogin());
    }
  }, [dispatch, loggingIn, token, error]);

  const submitHandler = () => {
    dispatch(login(username, password))
  };

  return (
    <div className={classes.Auth}>
      <Card>
        <form onSubmit={submitHandler}>
          <input
            disabled={loggingIn}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            disabled={loggingIn}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="positive"
            value="Login"
            onClick={() => submitHandler()}
          />
          {error && <p>Error</p>}
        </form>
      </Card>
    </div>
  );
};

export default Auth;
