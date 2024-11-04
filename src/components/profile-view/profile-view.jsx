// src/profile-view/profile-view.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./user-info";
import DeleteAccountButton from "./delete-account-button";
import FavoriteMovies from "./favorite-movie";
import ProfileUpdate from "./profile-update";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProfileView = ({ 
  users = [], 
  favoriteMovies = [], 
  handleFavoriteToggle, 
  setFavoriteMovies = () => {}
}) => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const user = users.find((u) => u.userId === userId) ||
    (storedUser && storedUser.userId === userId ? storedUser : null);

  useEffect(() => {
    if (user) {
      setFavoriteMovies(user.favoriteMovies);
    }
  }, [user]);

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-app-47zy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((moviesData) => {
        const processedMovies = moviesData.map(movie => ({
          _id: movie._id.$oid || movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre?.Name || "Unknown Genre",
            Description: movie.Genre?.Description || ""
          },
          Director: {
            Name: movie.Director?.Name || "Unknown Director",
            Bio: movie.Director?.Bio || "",
            BirthDate: movie.Director?.BirthDate || ""
          },
          ImagePath: movie.ImagePath || "",
          Featured: movie.Featured || false,
          Actors: movie.Actors || [],
        }));
        setMovies(processedMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
      });
  }, [token]);

  const favoriteMovieList = movies.filter((m) => 
    favoriteMovies.includes(String(m._id))
  );

  const handleFavoriteToggleClick = async (movieId) => {
    try {
      const method = favoriteMovies.includes(movieId) ? "DELETE" : "POST";
      const response = await fetch(
        `https://movie-app-47zy.onrender.com/users/${user.Username}/movies/${movieId}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update favorite: ${response.statusText}`);
      }

      setFavoriteMovies((prevFavorites) =>
        method === "POST"
          ? [...prevFavorites, movieId]
          : prevFavorites.filter((id) => id !== movieId)
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://movie-app-47zy.onrender.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      Object.assign(user, editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onLoggedOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo User={user.Username} Email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <ProfileUpdate
            user={user}
            handleChange={handleChange}
            handleSaveClick={handleSaveClick}
            handleEditClick={handleEditClick}
            isEditing={isEditing}
            editedUser={editedUser}
          />
          <hr />
          <h3>Delete Account</h3>
          <DeleteAccountButton
            username={user.Username}
            token={token}
            onLoggedOut={onLoggedOut}
          />
        </Col>
      </Row>
      <hr />
      <FavoriteMovies
        user={user}
        favoriteMovies={favoriteMovies}
        handleFavoriteToggle={handleFavoriteToggleClick}
        favoriteMovieList={favoriteMovieList}
      />
    </Container>
  );
};
