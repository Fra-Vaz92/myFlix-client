import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList, handleFavoriteToggle }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.length > 0 ? (
            favoriteMovieList.map(({ ImagePath, Title, _id }) => (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant="secondary"
                  onClick={() => handleFavoriteToggle(_id)}
                >
                  Remove from list
                </Button>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No favorite movies added yet.</p>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.array.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
};

export default FavoriteMovies;
