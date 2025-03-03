import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies = [], user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);


  const movie = movies.find((b) => b._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  useEffect(() => {
    if (user && user.FavoriteMovies && movie) {
      setIsFavorite(user.FavoriteMovies.includes(movie._id));
    }
  }, [movieId, user]);

  const addToFavorite = () => {
    fetch(`https://movie-app-47zy.onrender.com/users/${user.Username}/favorites/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add to favorites");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true);
      })
      .catch((e) => console.error("Error adding to favorites:", e));
  };

  const removeFromFavorite = () => {

    if (!isFavorite) {
      setIsFavorite(false);// If the movie is already not in the favorite list, don't make the API request
      return;
    }

    fetch(`https://movie-app-47zy.onrender.com/users/${user.Username}/favorites/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove from favorites");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false);

      })
      .catch((e) => console.error("Error removing from favorites:", e));
  };

  return (
    <Card className="h-100 w-100">
      <Card.Img variant="top" src={movie.ImagePath || ""} />
      <Card.Body>
        <Card.Header className="text-center fs-1">{movie.Title}</Card.Header>
        <Card.Text><strong>Director:</strong> {movie.Director?.Name || "Unknown Director"}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.Genre?.Name || "Unknown Genre"}</Card.Text>
        <Card.Text><strong>Description:</strong> {movie.Description}</Card.Text>
        <Card.Text><strong>Actors:</strong> {movie.Actors || []}</Card.Text>
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
        <div className="mt-1">
          {isFavorite ? (
            <Button variant="danger" onClick={removeFromFavorite}>
              Remove from Favorite
            </Button>
          ) : (
            <Button variant="primary" onClick={addToFavorite}>
              Add to Favorite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
