import React, { useRef, useEffect, useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
import Legend from './Legend'
import data from './data.json';

mapboxgl.accessToken =   // This is a public token, so no worries about it being shown on github
  "pk.eyJ1IjoiYXJjaGVvcHNvciIsImEiOiJja3UyMGZsNmk0MjNhMm9wM3A5bGswdTJuIn0.atO6m2GdbRSzctGhblMJSQ";


const Map = () => {
  const datalegend = {
    name: 'Percent Uninsured',
    description: 'Percentage of the population without health insurance.',
    property: 'pct_uninsured',
    stops: [
      [0, '#f8d5cc'],
      [0.05, '#f4bfb6'],
      [0.1, '#f1a8a5'],
      [0.15, '#ee8f9a'],
      [0.2, '#ec739b'],
      [0.25, '#dd5ca8'],
      [0.3, '#c44cc0'],
      [0.35, '#9f43d7'],
      [0.4, '#6e40e6']
    ]
  };
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-79.0467);
  const [lat, setLat] = useState(35.9046);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('load', () => {
      map.addSource('counties', {
        type: 'geojson',
        data
      });

      map.setLayoutProperty('county-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2},
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN OFFC Pro Italic', 'Arial Unicode MS Regular']
          ]
        }
      ]);
      
      map.addLayer(
        {
          id: 'counties',
          type: 'fill',
          source: 'counties'
        },
        'country-label'
      );
      
      map.setPaintProperty('counties', 'fill-color', {
        property: datalegend.property,
        stops: datalegend.stops
      });

      setMap(map);
    })

    // Save values to have a sidebar thingy showing these values
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);
  
  useEffect(() => {
    paint();
  }, [datalegend]);

  const paint = () => {
    if (map) {
      map.setPaintProperty('countries', 'fill-color', {
        property: datalegend.property,
        stops: datalegend.stops
      });
    }
  }

  return (
    <div>
      <div ref={mapContainerRef} className = 'map-container' />
        {/* Sidebar showing lat/long and zoom */}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <Legend active={datalegend} stops={datalegend.stops} />
    </div>
  );
};

export default Map;

// export default class Map extends React.PureComponent {  
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: -79.046761,
//       lat: 35.904613,
//       zoom: 9,
//     };
//     this.mapContainer = React.createRef();
//   }

//   componentDidMount() {
//     const { lng, lat, zoom } = this.state;
//     const map = new mapboxgl.Map({
//       container: this.mapContainer.current,
//       style: "mapbox://styles/mapbox/dark-v10",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.on("move", () => {
//       this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2),
//       });
//     });
//   }

//   render() {
//     const { lng, lat, zoom } = this.state;
//     return (
//       <div>
//         {/* Sidebar showing lat/long and zoom */}
//         <div className="sidebar">
//           Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//         </div>

//         {/* Map */}
//         <div ref={this.mapContainer} className="map-container" />
//       </div>
//     );
//   }
// }

//https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_5m.json