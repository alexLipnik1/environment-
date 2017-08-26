import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from './app.scss';


const style = {
  width: '75%',
  height: '100%'
}

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

  markers = (data) => {

    var lat,lng,name,time,id=0;

    var arr = [   
    ]

    for(var j in data){
      var temp = data[j];
      for(var i in temp){
        if(i === 'client_id'){
          name = temp[i];
        }
        if(i === 'time'){
          time = temp[i];
        }
        if(i === 'location'){
          lng = temp[i].coordinates[0];
          lat = temp[i].coordinates[1];
          arr.push([
              {lat: lat, lng: lng},
              name,
              time,
              id++
            ]
          )
        }
      }
    }

    return  arr.map((v, i) => {
      return (
        <Marker
          id ={i}
          onClick={this.onMarkerClick}
          title={'The marker`s title will appear as a tooltip.'}
          name={"client_id: "+ v[1] }
          time={"time: " + v[2] }
          position={v[0]}
          icon ={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
        />  
      )
    })
  }

  render() {
    const { data, ...rest } = this.props;
    return (
  		<Map
        center={{ lat: 43.363882, lng: -90.044922 }}
        style={style}
          zoom={7}
        {...rest} 
      >
        {
          this.markers(data)
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <h5>{this.state.selectedPlace.time}</h5>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC82eeWEOZQ6JRrggJUjzkoEKSdIlVqkc8"
})(MapContainer)
