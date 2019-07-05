import React from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
const BackendPage = () => {
  const { history } = useReactRouter();
  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          history.replace("/MapPage");
        }}
      >
        GO TO MAP PAGE
      </Button>
    </div>
  );
};

export default BackendPage;
