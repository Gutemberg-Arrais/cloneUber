import React from 'react';
import { View } from 'react-native';
import MapViewDirection from 'react-native-maps-directions'
// import { Container } from './styles';

const Directions = ({ destination, origin, onReady }) => {
  return <MapViewDirection
   destination={destination}
   origin={origin}
   onReady={onReady}
   apikey="AIzaSyDelaQOVM7MoN0egNkmvrETBMXHvn5gOQA"
   strokeWidth={3}
   strokeColor="#222"
   />;
}

export default Directions;