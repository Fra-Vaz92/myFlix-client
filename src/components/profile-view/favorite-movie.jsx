import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Figure, Button } from "react-bootstrap";

const FavoriteMovies = ({
  movies,
  favoriteMovies,
  favoriteMovieDetails,
  handleFavoriteToggle,
}) => {
  return (
    <div>
      <h4>Your Favorite Movies</h4>
      <Row>
        {favoriteMovieDetails.length > 0 ? (
          favoriteMovieDetails.map((movie) => (
            <Col xs={12} md={6} lg={4} key={movie._id} className="mb-3">
              <Figure>
                <Figure.Image
                  src={movie.ImagePath}
                  alt={movie.Title}
                  style={{ width: "100%", height: "auto" }}
                />
                <Figure.Caption>{movie.Title}</Figure.Caption>
              </Figure>
              <Button
                variant="danger"
                onClick={() => handleFavoriteToggle(movie._id)}
              >
                Remove from Favorites
              </Button>
            </Col>
          ))
        ) : (
          <Col>
            <p>You have no favorite movies yet.</p>
          </Col>
        )}
      </Row>

      <hr />
      <h4>Add Movies to Favorites</h4>
      <Row>
        {movies.map((movie) => (
          <Col xs={12} md={6} lg={4} key={movie._id} className="mb-3">
            <Figure>
              <Figure.Image
                src={movie.ImagePath}
                alt={movie.Title}
                style={{ width: "100%", height: "auto" }}
              />
              <Figure.Caption>{movie.Title}</Figure.Caption>
            </Figure>
            <Button
              variant={
                favoriteMovies.includes(movie._id) ? "success" : "primary"
              }
              onClick={() => handleFavoriteToggle(movie._id)}
            >
              {favoriteMovies.includes(movie._id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

FavoriteMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  favoriteMovieDetails: PropTypes.array.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
};

export default FavoriteMovies;