import React, { Component } from 'react';
import axios from 'axios';
import Map from './mapLoad';

class MapLocation extends Component {
	state = {
		issLocation: []
	};

	async componentDidMount() {
	    const { data: issLocation } = await axios.get('http://api.open-notify.org/iss-now');
	    this.setState({ 
	    	issLocation: {
	            issLat: Number(issLocation.iss_position.latitude),
	            issLong: Number(issLocation.iss_position.longitude)
        	}
	    });
	}

	render() {
		const { issLocation } = this.state;

		return (
			<div className="iss-mapLocation">
				<div className="iss-wrapper">
					<h3>ISS current location</h3>
					<p><strong>Latitude:</strong> { issLocation.issLat }</p>
					<p><strong>Longitude:</strong> { issLocation.issLong }</p>
					
					<Map id="issMap"
			        options={ { 
			          center: { 
			          	lat: issLocation.issLat, 
			          	lng: issLocation.issLong 
			          },
			          zoom: 5
			        } }
			        onMapLoad={ map => {
			          /*const marker =*/ new window.google.maps.Marker({
			            position: { lat: issLocation.issLat, lng: issLocation.issLong },
			            map: map
			          });
			        } } 
			    />
				</div>
			</div>
		);
	}
}

export default MapLocation;