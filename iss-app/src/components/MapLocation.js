import React, { Component } from 'react';
import Map from './mapLoad';

export default class MapLocation extends Component {
	
	render() {
		return (
			<div className="iss-container iss-mapLocation">
				<div className="iss-wrapper">
					<h2>Current location</h2>
					<p><strong>Latitude:</strong> {this.props.issLat} </p>
					<p><strong>Longitude:</strong> {this.props.issLong} </p>

					{ this.props.issLat !== undefined && this.props.issLong !== undefined ?
						<Map id="issMap"
				        options={ { 
				          center: { 
				          	lat: this.props.issLat, 
				          	lng: this.props.issLong
				          },
				          zoom: 5
				        } }
				        onMapLoad={ map => {
				          	new window.google.maps.Marker({
				            position: { lat: this.props.issLat, lng: this.props.issLong },
				            map: map
				          });
				        } } 
				    	/> 
						: <p className="iss-alertMsg">Map loading...</p>
					}
				</div>
			</div>
		);
	}
}
