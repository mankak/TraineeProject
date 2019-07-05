import React, { useContext } from "react";
import { CardMedia, CardActionArea } from "@material-ui/core";
import SatImg from "./sattelite.PNG";
import { MapContext } from "./MapContext";
import MapStyle from "./Mapstyle";
import StandardImg from "./standard.PNG";
const MapStyleChange = () => {
  const mapContext = useContext(MapContext);

  const ChangeStyleSat = () => {
    const map = mapContext.map;
    map.setStyle("mapbox://styles/mapbox/satellite-streets-v9");
  };
  const ChangeStyleDefault = () => {
    mapContext.map.setStyle(MapStyle);
  };
  return (
    <div>
      <CardActionArea onClick={ChangeStyleDefault}>
        <CardMedia
          alt="img"
          image={StandardImg}
          title="Default Style"
          style={{ height: 200 }}
        />
      </CardActionArea>
      <CardActionArea onClick={ChangeStyleSat}>
        <CardMedia
          alt="img"
          image={SatImg}
          title="Sattelite Style"
          style={{ height: 200 }}
        />
      </CardActionArea>
    </div>
  );
};

export default MapStyleChange;
