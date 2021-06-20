import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

import moment from 'moment';

class MovieItem extends Component {

	render() {

		const movie = this.props.movie;

	    return (
	    	// <Link to={"/movies/" + movie.id.toString() } className="movie-list__item__link">
	    	<Link to={"/movies/"+ movie.movieId  } className="movie-list__item__link">
	    		<div className="movie-list__item__poster">
	    			<div className={ "movie-list__item__rating movie-list__item__rating--" + Math.round( movie.avgRating ) }>
						{ Number(movie.avgRating).toFixed(1) }
					</div>
	            	<img src={movie.posterPath? ("https://image.tmdb.org/t/p/w500" + movie.posterPath): "client/components/icon/placeholder.jpg"} alt={ movie.title } className="movie-list__item__poster__image" />
	            </div>
	            <h3 className="movie-list__item__title">{ movie.title }</h3>
	            <p className="movie-list__item__year">{ moment(movie.releaseYear).format('Y') }</p>
	        </Link>
	    );
	}

}

export default MovieItem;