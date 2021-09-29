import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJjaGVvcHNvciIsImEiOiJja3UyMGZsNmk0MjNhMm9wM3A5bGswdTJuIn0.atO6m2GdbRSzctGhblMJSQ";
// This is a public token, so no worries about it being shown on github

export default class Map extends React.PureComponent {  
  constructor(props) {
    super(props);
    this.state = {
      lng: -79.046761,
      lat: 35.904613,
      zoom: 9,
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        {/* Sidebar showing lat/long and zoom */}
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        {/* Map */}
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

//https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_5m.json
