import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
        <div>
            <img src={movie.image} />
        </div>
        <div>
            <span>Title: </span>
            <span>{movie.title}</span>
        </div>
        <div>
            <span>Description: </span>
            <span>{movie.description}</span>
        </div>
        <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
        </div>
        <div>
            <span>Director: </span>
            <span>{movie.director}</span>
        </div>
        <div>
            <span>Actors: </span>
            <span>{movie.actors.join(', ')}</span>
        </div>
        <div>
            <span>Release year: </span>
            <span>{movie.releaseYear}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
    </div>
    );
  };

  MovieView.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string
      }).isRequired,
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };