import React, { Component } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PlacesGallery extends Component {
	state = {
		mediaPlaces: [],
	};

	async componentDidMount() {
	    const { data: mediaPlaces } = await axios.get('https://pixabay.com/api/', 
	    	{ params: {
	    		key: process.env.REACT_APP_PIXKEY, 
	    		q: 'Cities', 
	    		image_type: 'photo', 
	    		category: 'places',
	    		per_page: '15', 
	    		order: 'latest' }
	    })
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
							<LazyLoad height={ '100%' }>
								<TransitionGroup component={ null } appear={ true } enter={ true }>
									<CSSTransition 
										key={ place.id }
						            	timeout={ 200 }
						            	classNames="fade"
						            	enter={ true }
						            	appear={ true }
						            	in> 
										<img src={ place.webformatURL } alt={ place.pageURL } />
									</CSSTransition>
								</TransitionGroup>
							</LazyLoad>
						</li>
					))}</ul>
					
				</div>
			</div>
		);
	}
}

// in was = this.props.mediaPlaces 

export default PlacesGallery;