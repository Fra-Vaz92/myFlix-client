import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss';



function FavoriteMovies({ favoriteMovieList, onFavoriteChange }) {
  const removeFav = (id) => {
    const token = localStorage.getItem("token");
    const url = `https://movie-app-47zy.onrender.com/users/${localStorage.getItem("user")}/movies/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          if (onFavoriteChange) onFavoriteChange();
        } else {
          console.error("Failed to remove favorite:", response.statusText);
        }
      })
      .catch((e) => console.log("Error removing from favorites:", e));
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>
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
                <Button variant="secondary" onClick={() => removeFav(_id)}>
                  Remove from list
                </Button>
              </Col>
            ))
          ) : (
            <p>No favorite movies added yet.</p>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.array.isRequired,
  onFavoriteChange: PropTypes.func,
};

export default FavoriteMovies;