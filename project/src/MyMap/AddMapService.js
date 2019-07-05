import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { AddMapLayers } from "./Request";
const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "93%",
    right: "30%",
    margin: "0 auto"
  }
}));

const AddMapService = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClse = () => {
    setOpen(false);
  };

  const [layers, setLayers] = useState({});
  const [link, setLink] = useState({});

  const [error, setError] = useState(false);
  const addChange = () => {
    AddMapLayers(layers, link).then(rs => {
      setOpen(false);
    });
  };
  return (
    <div>
      <Fab color="primary" aria-label="Add" className={classes.fabButton}>
        <CreateIcon onClick={handleOpen} />
      </Fab>
      <Dialog open={open} onClose={handleClse}>
        <DialogTitle>Create Mapservice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add the name of layer,and enter wms mapservice here
          </DialogContentText>

          <TextField
            error={error}
            autoFocus
            margin="dense"
            variant="outlined"
            id="layername"
            label="Layer"
            fullWidth
            onChange={e => {
              setLayers(e.target.value);
              setError(false);
            }}
          />

          <TextField
            error={error}
            autoFocus
            margin="dense"
            variant="outlined"
            id="wmslink"
            label="Wms"
            fullWidth
            onChange={e1 => {
              setLink(e1.target.value);
              setError(false);
            }}
            placeholder="example:http://dev.i-bitz.co.th:30001/Kaen/wms?service=WMS&version=1.1.0&request=GetMap&WIDTH=256&HEIGHT=256&FORMAT=image/png&TILED=TRUE&transparent=true&bbox={bbox-epsg-3857}&LAYERS=RailStation&SRS=EPSG:3857"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClse}>
            cancel
          </Button>
          <Button color="primary" onClick={addChange}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMapService;
