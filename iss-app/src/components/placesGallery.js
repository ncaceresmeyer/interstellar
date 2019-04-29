import React, { Component } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class PlacesGallery extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	mediaPlaces: []
		}
    };

	async componentDidMount() {
		// get images of near city
        const { data: mediaPlaces } = await axios.get('https://pixabay.com/api/', 
	    	{ params: {
	    		key: process.env.REACT_APP_PIXKEY, 
	    		q: 'cities', 
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
		const { mediaPlaces } = this.state;

		return (
			<div className="iss-container iss-galleryPlaces">
				<div className="iss-wrapper">

					<h3>Latest Cities Gallery</h3>

					{ console.log ('test',this.props.firstCity) }
								
					<ul>
					{this.props.nearbyCities.map((city, i) => (
						<li key={ i }> * { city[1] + ' - ' + city[3] }</li> 
					))}
					</ul>

					<ul className="iss-grid">{mediaPlaces.map(place => (
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
										<img src={ place.webformatURL } alt={ place.tags } />
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