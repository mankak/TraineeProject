import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  Drawer,
  Button,
  Divider,
  Typography
} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import SelectLayers from "./SelectLayers";
import ArrowBackiosIcon from "@material-ui/icons/ArrowBackIos";
import PublicIcon from "@material-ui/icons/Public";
import AccountIcon from "@material-ui/icons/AccountCircle";
import MapStyleChange from "./MapStyleChange";
import PlaceIcon from "@material-ui/icons/Place";
import CreateMarker from "./CreateMarker";
import useReactRouter from "use-react-router";

const DrawerWidth = 60;
const useStyles = makeStyles(theme => ({
  list: {
    width: 60
  },
  paper: {
    width: 300,
    height: 450,
    overflow: "auto"
  },
  layerlist: {
    left: DrawerWidth,
    width: 300,
    border: "1px solid ",
    borderColor: "#E0E0E0"
  },
  btn: {
    marginBottom: 10
  }
}));
const MapHead = () => {
  const classes = useStyles();

  const [openlayer, setOpenLayer] = useState(false);
  const [baseOpen, setBaseOpen] = useState(false);
  const [location, setLocation] = useState(false);

  const handleOpen = () => {
    setOpenLayer(true);
    setBaseOpen(false);
    setLocation(false);
  };
  const handleClose = () => {
    setOpenLayer(false);
  };

  const BaseMapOpen = () => {
    setBaseOpen(true);
    setOpenLayer(false);
    setLocation(false);
  };
  const BaseMapClose = () => {
    setBaseOpen(false);
  };

  const LocationOpen = () => {
    setLocation(true);
    setOpenLayer(false);
    setBaseOpen(false);
  };

  const LocationClose = () => {
    setLocation(false);
  };
  const layers = ["Layers"].map((text, index) => (
    <Button
      key={text}
      className={classes.btn}
      size="small"
      onClick={handleOpen}
    >
      <LayersIcon />
    </Button>
  ));
  const { history } = useReactRouter();

  const goBack = () => {
    history.replace("/");
  };
  return (
    <div>
      <Drawer className={classes.list} variant="permanent" anchor="left">
        <IconButton onClick={goBack}>
          <AccountIcon />
        </IconButton>
        <div className={classes.list} role="presentation">
          <Divider />
          <List>
            {layers}
            <Button className={classes.btn} size="small" onClick={BaseMapOpen}>
              <PublicIcon />
            </Button>
            <Button className={classes.btn} size="small" onClick={LocationOpen}>
              <PlaceIcon />
            </Button>
          </List>
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openlayer}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={handleClose}>
            <ArrowBackiosIcon />
            <Typography variant="h6">Select your layers</Typography>
          </IconButton>
          <Divider />
          <SelectLayers />
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={baseOpen}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={BaseMapClose}>
            <ArrowBackiosIcon />
            <Typography variant="h6">Select Basemap</Typography>
          </IconButton>
          <Divider />
          <MapStyleChange />
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={location}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={LocationClose}>
            <ArrowBackiosIcon />
            <Typography variant="h6">Create Marker</Typography>
          </IconButton>
          <CreateMarker />
          <Divider />
        </div>
      </Drawer>
    </div>
  );
};

export default MapHead;
