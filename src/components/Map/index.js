import React, {Component, Fragment} from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Search from '../Search/index';
import Directions from '../Directions/index';
import {getPixelSize} from '../../utils';
import { LocationBox, LocationText, LocationTimeText, LocationTimeTextSmall, Back } from './styles';
import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import GeoCoder from 'react-native-geocoding';
import Details from '../Details/index';

//GeoCoder.init('AIzaSyDelaQOVM7MoN0egNkmvrETBMXHvn5gOQA');

export default class Map extends Component {
    state = {
        region: null,
        location: null,
        destination: null,
        duration: null,
        latitude: null,
        longitude: null,
        options: {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 1000
        }
    };


    successPosition(pos) {
        var crd = pos.coords;
      
        console.log('Sua posição atual é:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('Mais ou menos ' + crd.accuracy + ' metros.');
      };

    errorPosition(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    handleBack = () => {
        this.setState({destination: null})
    }

    handleLocationSelected = ( data, { geometry } ) => {
        const { location: {lat: latitude, long: longitude} } = geometry
        this.setState({
            destination: {
                latitude, longitude,
                title: data.structured_formatting.main_text,
            }, latitude: latitude, longitude: longitude
        })
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition( this.successPosition, this.errorPosition, this.state.options )
        const response = await GeoCoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));
        this.setState({location})
    }

    render() {
        const { region, destination, duration, location } = this.state;

        return (<View style={{flex: 1}}> 
            <MapView
                style={ {flex: 1} }
                region={region}
                showsUserLocation
                loadingEnabled
                ref={el => this.mapView = el}
            > 
            {destination &&
                <Fragment>

                <Directions origin={region} destination={destination} onReady={(result)=>{
                    this.setState({duration: Math.floor(result.duration)})
                    this.mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            rigth: getPixelSize(50),
                            left: getPixelSize(50),
                            top: getPixelSize(50),
                            bottom: getPixelSize(350)
                        }
                    })
                }} /> 
                <Marker coordinate={destination} anchor={{x:0, y:0}} image={markerImage} >
                   <LocationBox>
                        <LocationText>{destination.title}</LocationText>   
                    </LocationBox> 
                </Marker>

                <Marker coordinate={region} anchor={{x:0, y:0}} >
                   <LocationBox>
                        <LocationTimeBox>
                            <LocationTimeText>{duration}</LocationTimeText>
                            <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                        </LocationTimeBox>
                        <LocationText>{location}</LocationText>   
                    </LocationBox> 
                </Marker>
                </Fragment>
            }
            </MapView>
            {destination ? <Fragment> <Back onPress={this.handleBack}> <Image source={backImage} /> </Back> <Details /> </Fragment>  : 
            <Search onLocationSelected={this.handleLocationSelected} />}
    </View>);
    }  
}
