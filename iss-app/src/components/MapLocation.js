import React, { Component } from 'react';
import Map from './mapLoad';

export default class MapLocation extends Component {
	
	render() {
		return (
			<div className="iss-container iss-mapLocation">
				<div className="iss-wrapper">
					<h3>Current location</h3>
					<p><strong>Latitude:</strong> {this.props.issLat} </p>
					<p><strong>Longitude:</strong> {this.props.issLong} </p>
					
					<Map id="issMap"
			        options={ { 
			          center: { 
			          	lat: this.props.issLat, 
			          	lng: this.props.issLong
			          },
			          zoom: 5
			        }}
			        onMapLoad={ map => {
			          	new window.google.maps.Marker({
			            position: { lat: this.props.issLat, lng: this.props.issLong },
			            map: map
			          });
			        }} 
			    	/>
				</div>
			</div>
		);
	}
}
