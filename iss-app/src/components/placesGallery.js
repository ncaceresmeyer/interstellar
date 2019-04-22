import React, { Component } from 'react';
import axios from 'axios';

class PlacesGallery extends Component {
	state = {
		mediaPlaces: []
	};

	async componentDidMount() {
	    const { data: mediaPlaces } = await axios.get("https://pixabay.com/api/", {params: {key: process.env.REACT_APP_PIXKEY, q:"cities", image_type: "photo", category: "places", per_page: "15", order: "latest"}})
	    this.setState({ 
          mediaPlaces: mediaPlaces.hits
        });
	}

	render() {
		return (
			<div className="iss-container iss-galleryPlaces">
				<div className="iss-wrapper">
					<h3>Latest Cities Gallery</h3>

					<ul>{this.state.mediaPlaces.map(place => (
						<li key={ place.id }>
							<img src={ place.webformatURL } alt={ place.pageURL } />
						</li>
					))}</ul>
					
				</div>
			</div>
		);
	}
}

export default PlacesGallery;