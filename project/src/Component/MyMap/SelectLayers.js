import React, { useState, useContext } from "react";
import {
  Button,
  Fab,
  Divider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  InputLabel,
  DialogContentText,
  MenuItem,
  Card,
  CardActionArea,
  CardActions,
  IconButton,
  DialogActions,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { getMapLayers } from "./Request";
import { MapContext } from "./MapContext";
import DeleteIcon from "@material-ui/icons/DeleteSweep";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddMapService from "./AddMapService";

const useStyles = makeStyles(theme => ({
  list: {
    width: 50
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "93%",
    right: "55%",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: 300
  }
}));

const SelectLayers = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);
  const [wms, setWms] = useState([]);

  const addMapservice = () => {
    setOpen(true);

    getMapLayers().then(rs => {
      if (rs.status === 400) {
        setWms([]);
      }
      if ((rs.status = 200)) {
        setWms(rs);
      }
    });
  };

  const WmsList = wms.map(key => {
    return (
      <MenuItem key={key.layerName} value={key.layerName}>
        {key.label}
      </MenuItem>
    );
  });

  const [layers, setLayers] = useState({ wms: [] });

  const wmsLayers = layers.wms.map(key => {
    return (
      <div key={key.layerName}>
        <Card>
          <CardActionArea>
            <FormControlLabel
              control={<Switch value={key.layerName} />}
              label={key.label}
              onChange={() => {
                const layerid = key.layerName;
                const layerlink = key.request;
                const map = mapContext.map;
                const check = map.getStyle();
                const filter = check.layers.filter(re => re.id === layerid);
                const linkcut = layerlink.split("?");
                const linknew = new URL(layerlink);

                var SERVICE = "SERVICE=WMS";
                var transparent =
                  "transparent=" + linknew.searchParams.get("transparent");
                var VERSION = "VERSION=" + linknew.searchParams.get("VERSION");
                var REQUEST = "REQUEST=" + linknew.searchParams.get("REQUEST");
                var CRS = "CRS=" + linknew.searchParams.get("CRS");
                var WIDTH = "WIDTH=" + linknew.searchParams.get("WIDTH");
                var HEIGHT = "HEIGHT=" + linknew.searchParams.get("HEIGHT");
                var FORMAT = "FORMAT=" + linknew.searchParams.get("FORMAT");
                var TILED = "TILED=" + linknew.searchParams.get("TILED");
                var STYLES =
                  "STYLES&LAYERS=" + linknew.searchParams.get("LAYERS");
                var bbox = "bbox=" + linknew.searchParams.get("bbox");

                if (transparent === "transparent=null") {
                  transparent = "transparent=true";
                }
                if (VERSION === "VERSION=null") {
                  VERSION = "VERSION=" + linknew.searchParams.get("version");
                }
                if (REQUEST === "REQUEST=null") {
                  REQUEST = "REQUEST=" + linknew.searchParams.get("request");
                }

                if (WIDTH === "WIDTH=null") {
                  WIDTH = "WIDTH=" + linknew.searchParams.get("width");
                }
                if (HEIGHT === "HEIGHT=null") {
                  HEIGHT = "HEIGHT=" + linknew.searchParams.get("height");
                }
                if (FORMAT === "FORMAT=null") {
                  FORMAT = "FORMAT=" + linknew.searchParams.get("format");
                }
                if (TILED === "TILED=null") {
                  TILED = "TILED=" + linknew.searchParams.get("tiled");
                }
                if (STYLES === "STYLES&LAYERS=null") {
                  STYLES =
                    "STYLES&LAYERS=" + linknew.searchParams.get("layers");
                }
                if (bbox !== "{bbox-epsg-3857}") {
                  bbox = "bbox={bbox-epsg-3857}";
                }

                if (CRS !== "EPSG:3857") {
                  CRS = "CRS=EPSG:3857";
                }
                var LinkAdd =
                  linkcut[0] +
                  "?" +
                  SERVICE +
                  "&" +
                  transparent +
                  "&" +
                  VERSION +
                  "&" +
                  REQUEST +
                  "&" +
                  CRS +
                  "&" +
                  WIDTH +
                  "&" +
                  HEIGHT +
                  "&" +
                  FORMAT +
                  "&" +
                  TILED +
                  "&" +
                  STYLES +
                  "&" +
                  bbox;

                if (key.layerName === "Bad Request 404") {
                  alert("Bad Request 404");
                  filter.length = 1;
                }
                if (filter.length === 0) {
                  map.addLayer({
                    id: layerid,
                    type: "raster",
                    source: {
                      type: "raster",
                      tiles: [LinkAdd],
                      tileSize: 256
                    },
                    paint: {}
                  });

                  map.setLayoutProperty(layerid, "visibility", "visible");
                } else {
                  map.removeLayer(layerid);
                  map.removeSource(layerid);
                }
              }}
            />
          </CardActionArea>
          <CardActions>
            <IconButton
              onClick={layerid => {
                layerid.stopPropagation();
                const remian = layers.wms.filter(
                  c => c.layerName !== key.layerName
                );

                if (
                  window.confirm("Are you sure you want to delete this Layer?")
                ) {
                  setLayers({ wms: remian });
                  mapContext.map.removeLayer(key.layerName);
                  //mapContext.map.removeSource(key.layerName);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  });

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setChange(e.target.value);
    console.log(change);
    setError(false);
    setTextError("");
  };

  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const LayerSelected = () => {
    if (change === "") {
      setError(true);
      setTextError("please select your layer");
    } else {
      const input = wms.filter(re => re.layerName === change)[0];
      console.log(input);
      setChange("");
      setLayers({ ...layers, wms: [...layers.wms, input] });
      const remian = wms.filter(c => c.layerName !== change);
      setWms(remian);
    }
  };
  console.log(change);

  return (
    <div>
      {wmsLayers}

      <Divider />
      <Fab color="primary" aria-label="Add" className={classes.fabButton}>
        <AddIcon onClick={addMapservice} />
      </Fab>
      <AddMapService />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Layers</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose your layers</DialogContentText>
          <form className={classes.form}>
            <FormControl error={error}>
              <InputLabel>Layers</InputLabel>
              <Select value={change} onChange={handleChange}>
                <MenuItem value="" />
                {WmsList}
              </Select>
              <FormHelperText>{textError}</FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" color="secondary" onClick={LayerSelected}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SelectLayers;
