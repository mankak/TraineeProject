import React from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
const MapPage = () => {
  const { history } = useReactRouter();
  return (
    <div>
      <Button
        onClick={() => {
          history.replace("/MapPage");
        }}
      >
        Mappage
      </Button>
    </div>
  );
};

export default MapPage;
