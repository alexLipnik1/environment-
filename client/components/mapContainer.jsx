import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from './app.scss';

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
  		<Map google={this.props.google} zoom={14}>
  			<Marker
          className={styles.marker}
          onClick={this.onMarkerClick}
		      title={'The marker`s title will appear as a tooltip.'}
		      name={'SOMA'}
		      position={{lat: 37.778519, lng: -122.405640}}
          icon ={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'} 
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC82eeWEOZQ6JRrggJUjzkoEKSdIlVqkc8"
})(MapContainer)
