import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import styled from 'styled-components';
import MapPopup from '../MapPopup/MapPopup';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN_MAPBOXGL;

const wheatherKey = process.env.REACT_APP_WHEATHER_KEY;
const wheatherBaseUrl = 'https://api.weatherapi.com/v1';
const wheatherPathCurrent = '/current.json';

const MapStyled = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MapContainerStyled = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    cursor: pointer;
  }
`;

const SidebarStyled = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
  max-width: calc(40% - 24px);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [popup, setPopup] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(null);
  const marker = useRef(new mapboxgl.Marker({ color: 'orange' }));

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nisvem/cljys2k87006n01qyaspked4z',
      attributionControl: false,
      language: ['es'],
      maxZoom: 10,
      minZoom: 3,
    });

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        language: 'es-ES',
      }),
      'top-right'
    );

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(4));
    });

    map.current.on('click', (e) => {
      onClickMap(e.lngLat.lat, e.lngLat.lng);
      marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.current);
    });

    map.current.on('mousemove', (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });
  }, []);

  function onClosePopup() {
    setPopup(!popup);
    marker.current.remove();
  }

  function onClickMap(lat, lng) {
    setPopup(true);
    setReady(false);

    fetch(
      `${
        wheatherBaseUrl + wheatherPathCurrent
      }?key=${wheatherKey}&q=${lat},${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setReady(true);
          setData(data);
        }, 1000);
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  return (
    <MapStyled>
      <SidebarStyled>
        Longitude: {lng}
        <br />
        Latitude: {lat}
        <br />
        Zoom: {zoom}
      </SidebarStyled>
      <MapPopup open={popup} onClose={onClosePopup} ready={ready} data={data} />
      <MapContainerStyled ref={mapContainer}></MapContainerStyled>
    </MapStyled>
  );
};

export default Map;
