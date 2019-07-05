import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
const LoginPage = props => {
  const { history } = useReactRouter();
  return (
    <div>
      <TextField label="username" />
      <TextField label="password" />
      <Button
        onClick={() => {
          history.push("/Backend");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
