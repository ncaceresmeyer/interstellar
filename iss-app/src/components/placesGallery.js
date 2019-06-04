import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getPlacesGallery } from '../services/servicePlacesGallery';

export default class PlacesGallery extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	mediaPlaces: [],
	    	nearbyCities: []
		};
    };

	dataPlacesGallery() {
      getPlacesGallery()
        .then((res) => {
            this.setState({
				mediaPlaces: res.mediaPlaces,
				mediaSearchTerm: res.mediaSearchTerm,
				nearbyCities: res.nearbyCities
      		})
        })
        .catch(error => {
	    	this.setState({ error: 'Sorry, an error occurred' });
	    });
    }

    componentDidMount() {
    	this.dataPlacesGallery()
	};

	render() {
		const { mediaPlaces, mediaSearchTerm, error, nearbyCities } = this.state;

		return (

			<div className="iss-container iss-galleryPlaces"> 

				<div className="iss-wrapper">

					<h3>Latest Cities Gallery</h3>

					<ul>
						{nearbyCities.length > 1 ? nearbyCities.map((place, i) =>
							<li key={ String(i) } className="iss-listItems">{ place.nearCity + ' - ' + place.nearCountry }</li> )
						: 
							( <li className="iss-alertMsg">Sorry, no cities near this location.</li> )
						}
					</ul> 

					{ error && <p className="iss-alertMsg">{ error }</p> }

					<ul className="iss-grid">{ mediaSearchTerm !== undefined
						? mediaPlaces.map(media => 
							<li key={ media.id } tabIndex="0">
								<LazyLoad height={ '100%' }>
									<TransitionGroup component={ null } appear={ true } enter={ true }>
										<CSSTransition 
											key={ media.id }
							            	timeout={ 200 }
							            	classNames="fade"
							            	enter={ true }
							            	appear={ true }
							            	in> 
											<React.Fragment>
												<img src={ media.webformatURL } alt={ media.tags } aria-label={ 'image tagged with ' + media.tags } />
												<span className="iss-grid-info"><p>{ mediaSearchTerm }</p></span>
											</React.Fragment>
										</CSSTransition>
									</TransitionGroup>	
								</LazyLoad>
							</li>)
						: ( <li className="iss-alertMsg">Duh, we can't find photos for this place...</li> )
					}</ul>

				</div>
			</div>
		);
	}
}
