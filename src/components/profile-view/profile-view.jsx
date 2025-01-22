import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteMovies from "./favorite-movie";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProfileView = () => {
  const { Username } = useParams();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user details
  useEffect(() => {
    if (!token || !Username) return;

    fetch(`https://movie-app-47zy.onrender.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      });
  }, [token, Username]);

  // Add or remove favorite movies
  const handleFavoriteToggle = (movieId) => {
    const isFavorite = favoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://movie-app-47zy.onrender.com/users/${Username}/favorites/${movieId}`;

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorite movies.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        setFavoriteMovies(updatedUser.FavoriteMovies || []);
      })
      .catch((err) => {
        console.error("Error updating favorite movies:", err);
        setError("Failed to update favorite movies.");
      });
  };

  if (!user) {
    return <div>{error || "Loading user data..."}</div>;
  }

  const favoriteMovieDetails = movies.filter((movie) =>
    favoriteMovies.includes(movie._id)
  );

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{user.Username}'s Profile</Card.Title>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      <FavoriteMovies
        movies={movies}
        favoriteMovies={favoriteMovies}
        favoriteMovieDetails={favoriteMovieDetails}
        handleFavoriteToggle={handleFavoriteToggle}
      />
    </Container>
  );
};
