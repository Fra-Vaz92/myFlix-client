import React from "react";
import PropTypes from "prop-types";
<<<<<<< Updated upstream
export const MovieView = ({ movie, onBackClick }) => {
    return (
=======
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({movie}) => {
  const{movie_id} = useParams();
  const movie = movie.find((b) => b.id === movie_id);
    
  return (
>>>>>>> Stashed changes
        <div>
        <div>
            <img src={movie.image} />
        </div>
        <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
        </div>
        <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
        </div>
        <div>
            <span>Genre: </span>
            <span>{movie.Genre}</span>
        </div>
        <div>
            <span>Director: </span>
            <span>{movie.Director}</span>
        </div>
        <div>
            <span>Actors: </span>
            <span>{movie.actors.join(', ')}</span>
        </div>
        <div>
            <span>Release year: </span>
            <span>{movie.releaseYear}</span>
        </div>
<<<<<<< Updated upstream
        <button onClick={onBackClick}>Back</button>
=======
        <Link to={`/`}>
        <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
      </Link>
>>>>>>> Stashed changes
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
