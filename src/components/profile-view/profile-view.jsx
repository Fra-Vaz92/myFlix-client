import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { Card, Container, Button, Row, Col, Form } from "react-bootstrap";

export const ProfileView = ({ user, movies, onLogout, onUpdateUser }) => {
  const token = localStorage.getItem("token");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    Username: user.Username,
    Password: "",
    Email: user.Email,
    Birthday: user.Birthday,
  });

  // Fetch favorite movies
  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.length > 0) {
      const favorites = movies.filter((movie) =>
        user.FavoriteMovies.includes(movie._id)
      );
      setFavoriteMovies(favorites);
    }
  }, [user.FavoriteMovies, movies]);

  // Update user information
  const handleUpdateUser = () => {
    fetch(`https://movie-app-47zy.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update user information.");
        }
      })
      .then((updatedUserData) => {
        alert("Profile updated successfully!");
        onUpdateUser(updatedUserData);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Could not update profile. Please try again.");
      });
  };

  // Delete user account
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      fetch(`https://movie-app-47zy.onrender.com/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Account deleted successfully.");
            onLogout();
          } else {
            throw new Error("Failed to delete account.");
          }
        })
        .catch((err) => {
          console.error("Error deleting account:", err);
          alert("Could not delete account. Please try again.");
        });
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Form>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.Username}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        Username: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={updatedUser.Password}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        Password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedUser.Email}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        Email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={updatedUser.Birthday}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        Birthday: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateUser}>
                  Update Profile
                </Button>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>Favorite Movies</h4>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <Card key={movie._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
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

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLogout: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};
