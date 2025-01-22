// src/profile-view/profile-view.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteMovies from "./favorite-movie";
import { Card, Container, Row, Col } from "react-bootstrap";


export const ProfileView = () => {
  const { Username } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });

  // Fetch user details, including favorite movies
  useEffect(() => {
    if (!token || !Username) return;

    fetch(`https://movie-app-47zy.onrender.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setFavoriteMovies(data.FavoriteMovies || []);
        setUpdateData({
          Username: data.Username,
          Email: data.Email,
          Birthday: data.Birthday,
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      });
  }, [token, Username]);

  // Fetch movie details for favorite movies
  const fetchMovieDetails = async (movieId) => {
    return fetch(`https://movie-app-47zy.onrender.com/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Error fetching movie details:", err);
      });
  };

  const fetchFavoriteMovieDetails = async () => {
    const movieDetailsPromises = favoriteMovies.map(fetchMovieDetails);
    const movieDetails = await Promise.all(movieDetailsPromises);
    return movieDetails;
  };

  // Toggle favorite movie
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

  // Delete Account
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`https://movie-app-47zy.onrender.com/users/${Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete account.");
          }
          alert("Account deleted successfully.");
          localStorage.clear();
          navigate("/login");
        })
        .catch((err) => {
          console.error("Error deleting account:", err);
          setError("Failed to delete account.");
        });
    }
  };

  // Update Account
  const handleUpdateAccount = (e) => {
    e.preventDefault();
    fetch(`https://movie-app-47zy.onrender.com/users/${Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update account.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        alert("Account updated successfully.");
        setUser(updatedUser);
      })
      .catch((err) => {
        console.error("Error updating account:", err);
        setError("Failed to update account.");
      });
  };

  if (!user) {
    return <div>{error || "Loading user data..."}</div>;
  }

  const favoriteMovieDetails = favoriteMovies.length
    ? favoriteMovies.map((movieId) => fetchMovieDetails(movieId))
    : [];

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{user.Username}'s Profile</Card.Title>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
              <Button variant="danger" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleUpdateAccount}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={updateData.Username}
                onChange={(e) =>
                  setUpdateData({ ...updateData, Username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updateData.Email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, Email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={updateData.Birthday}
                onChange={(e) =>
                  setUpdateData({ ...updateData, Birthday: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={updateData.Password}
                onChange={(e) =>
                  setUpdateData({ ...updateData, Password: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Account
            </Button>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3>Favorite Movies</h3>
          {favoriteMovieDetails.length > 0 ? (
            favoriteMovieDetails.map((movie) => (
              <Card key={movie._id} style={{ marginBottom: "1rem" }}>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleFavoriteToggle(movie._id)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No favorite movies added yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};