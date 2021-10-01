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
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom
    });

    var hoveredCountyId = null;

    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        data,
        promoteId: "GEO_ID"
      });

      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
          ]
        }
      ]);

      map.addLayer(
        {
          id: 'countries',
          type: 'fill',
          source: 'countries',
          layout: {},
          paint: {
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.6
            ]
          }
        },
        'country-label'
      );

      map.addLayer(
        {
          id: 'countries-selected',
          type: 'fill',
          source: 'countries',
          layout: {},
          paint: {
            'fill-outline-color': '#004077',
            'fill-color': '#004077',
            'fill-opacity': 1.0,
          },
          filter: ['in', 'GEO_ID', '']
        },
        'country-label'
      );

      map.on('click', 'countries', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['countries'] });
        const geo_id = features.map((feature) => feature.properties.GEO_ID);
        map.setFilter('countries-selected', ['in', 'GEO_ID', ...geo_id]);
      });

      map.setPaintProperty('countries', 'fill-color', {
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

    // Hover action
    map.on("mousemove", "countries", (e) => {
      if (e.features.length === 0) return;
      if (e.features.length > 0) {
        if (hoveredCountyId) {
          map.setFeatureState(
            { source: "countries", id: hoveredCountyId },
            { hover: false}
          );
        }
        hoveredCountyId = e.features[0].id;
        map.setFeatureState(
          { source: 'countries', id: hoveredCountyId },
          { hover: true }
        );
      }
    });

    // Un-hover action
    map.on('mouseleave', 'countries', () => {
      if (hoveredCountyId) {
        map.setFeatureState(
          {source: 'countries', id: hoveredCountyId },
          { hover: false }
        );
      }
      hoveredCountyId = null;
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