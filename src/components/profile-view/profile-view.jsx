import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteMovies from "./favorite-movie";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import ProfileUpdate from "./profile-update"; 
import DeleteAccountButton from "./delete-account-button";

export const ProfileView = () => {
  const { Username } = useParams();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

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

  // Fetch all movies
  useEffect(() => {
    if (!token) return;

    fetch("https://movie-app-47zy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
      });
  }, [token]);

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
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr />
      <Row className="mb-4">
        <Col md={6}>
          <Button
            variant="primary"
            onClick={() => setIsUpdatingProfile(!isUpdatingProfile)}
          >
            {isUpdatingProfile ? "Cancel Update" : "Update Profile"}
          </Button>
        </Col>
        <Col md={6}>
          <DeleteAccountButton user={user} token={token} setUser={setUser} />
        </Col>
      </Row>

      {isUpdatingProfile && (
        <Row className="mb-4">
          <Col>
            <ProfileUpdate user={user} token={token} setUser={setUser} />
          </Col>
        </Row>
      )}

      <FavoriteMovies
        movies={movies}
        favoriteMovies={favoriteMovies}
        favoriteMovieDetails={favoriteMovieDetails}
        handleFavoriteToggle={handleFavoriteToggle}
      />
    </Container>
  );
};