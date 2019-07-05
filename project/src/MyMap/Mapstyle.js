export default {
  version: 8,
  name: "i-bitz Style V.1",
  metadata: {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "maputnik:renderer": "mbgljs",
    "openmaptiles:version": "3.x",
    "openmaptiles:mapbox:owner": "openmaptiles",
    "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t"
  },
  center: [15.87, 100.9925],
  zoom: 6,
  bearing: 0,
  pitch: 0,
  sources: {
    openmaptiles: {
      type: "vector",
      tiles: ["https://tile.i-bitz.co.th/data/v3/{z}/{x}/{y}.pbf"],
      minZoom: 0,
      maxZoom: 22
    }
  },
  sprite: "https://tile.i-bitz.co.th/styles/vallaris/sprite",
  glyphs: "https://tile.i-bitz.co.th/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "rgba(247, 247, 247, 1)" }
    },
    {
      id: "landuse-residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "class", "residential"]
      ],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(47, 13%, 86%)", "fill-opacity": 0.7 }
    },
    {
      id: "landcover_grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "grass"],
      paint: { "fill-color": "hsl(82, 46%, 72%)", "fill-opacity": 0.45 }
    },
    {
      id: "park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      minzoom: 0,
      paint: {
        "fill-color": {
          stops: [
            [4, "rgba(207, 230, 145, 0.75)"],
            [10, "rgba(207, 230, 145, 0.75)"]
          ]
        },
        "fill-opacity": 1,
        "fill-translate-anchor": "map"
      }
    },
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "wood"],
      paint: {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": { base: 1, stops: [[8, 0.6], [22, 1]] }
      }
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["==", "$type", "Polygon"],
      paint: {
        "fill-color": "rgba(119, 169, 255, 1)",
        "fill-translate-anchor": "map"
      }
    },
    {
      id: "landcover-ice-shelf",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "subclass", "ice_shelf"],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(47, 26%, 88%)", "fill-opacity": 0.8 }
    },
    {
      id: "landcover-glacier",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "subclass", "glacier"],
      layout: { visibility: "visible" },
      paint: {
        "fill-color": "hsl(47, 22%, 94%)",
        "fill-opacity": { base: 1, stops: [[0, 1], [8, 0.5]] }
      }
    },
    {
      id: "landcover_sand",
      type: "fill",
      metadata: {},
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["all", ["in", "class", "sand"]],
      paint: {
        "fill-antialias": false,
        "fill-color": "rgba(232, 214, 38, 1)",
        "fill-opacity": 0.3
      }
    },
    {
      id: "landuse",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", "class", "agriculture"],
      layout: { visibility: "visible" },
      paint: { "fill-color": "#eae0d0" }
    },
    {
      id: "landuse_overlay_national_park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "national_park"],
      paint: {
        "fill-color": "#E1EBB0",
        "fill-opacity": { base: 1, stops: [[5, 0], [9, 0.75]] }
      }
    },
    {
      id: "park_outline",
      type: "line",
      source: "openmaptiles",
      "source-layer": "park",
      layout: {},
      paint: {
        "line-color": "rgba(159, 183, 118, 0.69)",
        "line-dasharray": [0.5, 1]
      }
    },
    {
      id: "waterway-tunnel",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"]
      ],
      paint: {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": { base: 1.4, stops: [[8, 1], [20, 2]] },
        "line-opacity": 1,
        "line-gap-width": { stops: [[12, 0], [20, 6]] },
        "line-dasharray": [3, 3]
      }
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "tunnel", "bridge"]
      ],
      paint: {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": { base: 1.4, stops: [[8, 1], [20, 8]] },
        "line-opacity": 1
      }
    },
    {
      id: "tunnel_railway_transit",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 0,
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["==", "class", "transit"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": { base: 1, stops: [[11, 0], [16, 1]] },
        "line-dasharray": [3, 3]
      }
    },
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      paint: {
        "fill-color": "rgba(222, 211, 190, 1)",
        "fill-outline-color": {
          stops: [
            [15, "rgba(212, 177, 146, 0)"],
            [16, "rgba(212, 177, 146, 0.5)"]
          ]
        },
        "fill-opacity": { base: 1, stops: [[13, 0], [15, 1]] },
        "fill-antialias": true
      }
    },
    {
      id: "housenumber",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "housenumber",
      minzoom: 17,
      filter: ["==", "$type", "Point"],
      layout: {
        "text-field": "{housenumber}",
        "text-size": 10,
        "text-font": ["Kanit"]
      },
      paint: { "text-color": "rgba(212, 177, 146, 1)" }
    },
    {
      id: "road_bridge_area",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "$type", "Polygon"], ["in", "brunnel", "bridge"]],
      layout: {},
      paint: { "fill-color": "hsl(47, 26%, 88%)", "fill-opacity": 0.5 }
    },
    {
      id: "road_path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path", "track"]
      ],
      layout: { "line-cap": "square", "line-join": "bevel" },
      paint: {
        "line-color": "hsl(0, 0%, 97%)",
        "line-dasharray": [1, 1],
        "line-width": { base: 1.55, stops: [[4, 0.25], [20, 10]] }
      }
    },
    {
      id: "road_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "minor", "service"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(219, 219, 223, 1)",
        "line-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "tunnel_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["==", "class", "minor_road"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#efefef",
        "line-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] },
        "line-dasharray": [0.36, 0.18]
      }
    },
    {
      id: "tunnel_major",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#fff",
        "line-width": { base: 1.4, stops: [[6, 0.5], [20, 30]] },
        "line-dasharray": [0.28, 0.14]
      }
    },
    {
      id: "aeroway-area",
      type: "fill",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "runway", "taxiway"]
      ],
      layout: { visibility: "visible" },
      paint: {
        "fill-opacity": { base: 1, stops: [[13, 0], [14, 1]] },
        "fill-color": "rgba(255, 255, 255, 1)"
      }
    },
    {
      id: "aeroway-taxiway",
      type: "line",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 12,
      filter: [
        "all",
        ["in", "class", "taxiway"],
        ["==", "$type", "LineString"]
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible"
      },
      paint: {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": { base: 1.5, stops: [[12, 1], [17, 10]] },
        "line-opacity": 1
      }
    },
    {
      id: "aeroway-runway",
      type: "line",
      metadata: { "mapbox:group": "1444849345966.4436" },
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      filter: ["all", ["in", "class", "runway"], ["==", "$type", "LineString"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible"
      },
      paint: {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": { base: 1.5, stops: [[11, 4], [17, 50]] },
        "line-opacity": 1
      }
    },
    {
      id: "road_trunk_primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "trunk", "primary"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(164, 164, 164, 0.3333333333333333)",
        "line-width": { base: 1.4, stops: [[6, 0.8], [20, 30]] }
      }
    },
    {
      id: "road_secondary_tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "secondary", "tertiary"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(215, 211, 215, 1)",
        "line-width": { base: 1.4, stops: [[6, 0.5], [20, 20]] }
      }
    },
    {
      id: "road_major_motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "motorway"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(254, 186, 117, 0.73)",
        "line-width": { base: 1.4, stops: [[8, 1], [16, 10]] },
        "line-offset": 0
      }
    },
    {
      id: "road_oneway",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      filter: ["all", ["==", "oneway", 1]],
      layout: {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 200,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": 0,
        "icon-size": { stops: [[15, 0.5], [19, 1]] }
      },
      paint: { "icon-opacity": 0.5 }
    },
    {
      id: "road_oneway_opposite",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      filter: ["all", ["==", "oneway", -1]],
      layout: {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 200,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": 180,
        "icon-size": { stops: [[15, 0.5], [19, 1]] }
      },
      paint: { "icon-opacity": 0.5 }
    },
    {
      id: "railway-transit",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["all", ["==", "class", "transit"], ["!=", "brunnel", "tunnel"]],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": { base: 1, stops: [[11, 0], [16, 1]] }
      }
    },
    {
      id: "railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", "class", "rail"],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": { base: 1, stops: [[11, 0], [16, 1]] }
      }
    },
    {
      id: "waterway-bridge-case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#bbbbbb",
        "line-width": { base: 1.6, stops: [[12, 0.5], [20, 10]] },
        "line-gap-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "waterway-bridge",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "bridge_minor case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "minor_road"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#dedede",
        "line-width": { base: 1.6, stops: [[12, 0.5], [20, 10]] },
        "line-gap-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "bridge_major case",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      layout: { "line-cap": "butt", "line-join": "miter" },
      paint: {
        "line-color": "#dedede",
        "line-width": { base: 1.6, stops: [[12, 0.5], [20, 10]] },
        "line-gap-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "bridge_minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "minor_road"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#efefef",
        "line-width": { base: 1.55, stops: [[4, 0.25], [20, 30]] }
      }
    },
    {
      id: "bridge_major",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#fff",
        "line-width": { base: 1.4, stops: [[6, 0.5], [20, 30]] }
      }
    },
    {
      id: "admin_sub",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: ["in", "admin_level", 4, 6, 8],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "rgba(111, 110, 110, 0.5)",
        "line-dasharray": [2, 1],
        "line-width": { stops: [[6, 1], [10, 1.2]] }
      }
    },
    {
      id: "admin_country",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: ["all", ["<=", "admin_level", 2], ["==", "$type", "LineString"]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(114, 114, 114, 1)",
        "line-width": { base: 1.3, stops: [[3, 1.1], [22, 15]] }
      }
    },
    {
      id: "poi_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 14,
      filter: ["all", ["==", "$type", "Point"], ["==", "rank", 1]],
      layout: {
        "text-size": 11,
        "text-font": ["Kanit"],
        visibility: "visible",
        "text-offset": [0, 0.5],
        "icon-size": 1,
        "text-anchor": "top",
        "text-field": "{name}",
        "text-max-width": 8
      },
      paint: {
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-blur": 1
      }
    },
    {
      id: "airport-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "aerodrome_label",
      minzoom: 10,
      filter: ["all", ["has", "iata"]],
      layout: {
        "text-size": 11,
        "text-font": ["Kanit"],
        visibility: "visible",
        "text-offset": [0, 0.5],
        "icon-size": 1,
        "text-anchor": "top",
        "text-field": "{name}",
        "text-max-width": 8
      },
      paint: {
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-blur": 1
      }
    },
    {
      id: "road_major_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      filter: ["==", "$type", "LineString"],
      layout: {
        "symbol-placement": "line",
        "text-field": "{name}",
        "text-font": ["Kanit"],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-size": { base: 1.4, stops: [[10, 8], [20, 14]] },
        "text-rotation-alignment": "map"
      },
      paint: {
        "text-color": "#000",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      id: "place_label_other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 8,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "city", "state", "country", "continent"]
      ],
      layout: {
        "text-field": "{name}",
        "text-font": ["Kanit"],
        "text-max-width": 6,
        "text-size": { stops: [[6, 5], [12, 12]] },
        visibility: "visible",
        "text-anchor": "center",
        "text-keep-upright": true,
        "icon-allow-overlap": false,
        "icon-ignore-placement": false,
        "icon-offset": [22, 0]
      },
      paint: {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 0,
        "text-halo-width": 2
      }
    },
    {
      id: "place_label_city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 16,
      filter: ["all", ["==", "$type", "Point"], ["==", "class", "city"]],
      layout: {
        "text-field": "{name}",
        "text-font": ["Kanit"],
        "text-max-width": 10,
        "text-size": { stops: [[3, 6], [8, 11]] }
      },
      paint: {
        "text-color": "hsl(0, 0%, 0%)",
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-blur": 0,
        "text-halo-width": 2
      }
    },
    {
      id: "country_label-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 12,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "country"],
        ["!has", "iso_a2"]
      ],
      layout: {
        "text-field": "{name}",
        "text-font": ["Kanit"],
        "text-max-width": 10,
        "text-size": { stops: [[3, 12], [8, 22]] },
        visibility: "visible"
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
        "text-halo-blur": 0
      }
    },
    {
      id: "country_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 12,
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "country"],
        ["has", "iso_a2"]
      ],
      layout: {
        "text-field": "{name}",
        "text-font": ["Kanit"],
        "text-max-width": 10,
        "text-size": { stops: [[3, 11], [8, 22]] },
        visibility: "visible"
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
        "text-halo-blur": 0
      }
    }
  ],
  id: "klokantech-basic"
};
