import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
render() {
    return (
		<Map google={this.props.google} zoom={14}>

          <Marker onClick={this.onMarkerClick}/>

          <InfoWindow onClose={this.onInfoWindowClose}>
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC82eeWEOZQ6JRrggJUjzkoEKSdIlVqkc8"
})(MapContainer)
