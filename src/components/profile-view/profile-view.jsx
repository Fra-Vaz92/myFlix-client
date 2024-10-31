//parentcomponent
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserInfo from "./user-info";
import DeleteAccountButton from "./delete-account-button";
import FavoriteMovies from "./favorite-movie";
import ProfileUpdate from "./profile-update";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProfileView = ({ users = [],  favoriteMovies, handleFavoriteToggle, setFavoriteMovies}) => {

  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const user = users.find((u) => u.userId === userId);

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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Actors:movie.actor,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
      });
  }, [token]);

  const favoriteMovieList = movies.filter(
    (m) => favoriteMovies.includes(String(m.id)) // Convert to string
  );

  console.log(favoriteMovieList);

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
        `https://movie-app-47zy.onrender.com/users/${user.username}`,
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
    // setUser(null);
    // setToken(null);
    localStorage.clear();
    window.location.reload();
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Container>
        <Row>
          
          <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
            <UserInfo name={user.name} email={user.email} />
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
             
            <hr/>
            <h3>Delete Account</h3>
            <DeleteAccountButton
          username={user.username}
          token={token}
          onLoggedOut={onLoggedOut}
        />
          </Col>
        </Row>
        
        <hr />
        <FavoriteMovies
          user={user}
          favoriteMovies={favoriteMovies}
          handleFavoriteToggle={handleFavoriteToggle}
          favoriteMovieList={favoriteMovieList}
        />
      </Container>
    </>
  );
};