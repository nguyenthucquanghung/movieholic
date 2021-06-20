import React, { Component } from 'react';

import './Rating.scss';

var axios = require('axios');

import { Remote } from './Remote';

class Rating extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      rating: this.props.value,
	    };

	    //this.storeRating = this.storeRating.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		/*
		if( this.props.rating !== nextProps.rating) 
	    {
           
	    }*/

	    this.setState({
      		rating: nextProps.rating
    	});
	}

	storeRating(rating) {
		var th = this;
		var id = this.props.movie
		var sessionId = localStorage.getItem('session_id');
		if(sessionId !== null) {
			axios.post( Remote('movie/' + id + '/rating', { session_id : sessionId }),
				{
				    value: rating
				})
		      	.then(function(result) {  
		        	th.setState({
		          		rating: rating
		        	});
		    	})
		}
	}

	render() {
		let stars = [];
		for (var i = 1; i < 11; i++) {
			stars.push(i);
		}
		var th = this;
		var sessionId = localStorage.getItem('session_id');
	    return (
	    	<div className="rating">
	    		<div className="stars" data-stars={ this.state.rating }>
					{stars.map(function(rating) {
			          return (
			            <svg key={ rating } height="32" width="32" className="star rating" data-rating={ rating } onClick={ () => th.storeRating(rating) }>
					    	<polygon id="Shape" points="23.9605963 8.744 16.0252422 7.06926708 11.980323 0.0399006211 7.93535404 7.06926708 0 8.744 5.43542857 14.7631304 4.57609938 22.827528 11.980323 19.5181615 19.3844969 22.827528 18.525118 14.7631304"></polygon>
						</svg>
			          );
			        })}
	    		</div>
	    		{ sessionId === null &&
	    			<div className="rating__message">
	    				You need to log in in order to rate
	    			</div>
	    		}
	    		
	    	</div>
	    );
	}

}

export default Rating;