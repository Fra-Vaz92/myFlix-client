import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log("No token found; user needs to log in.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch("https://movie-app-47zy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((moviesData) => {
        console.log(moviesData);
        if (!Array.isArray(moviesData)) {
          throw new Error("Invalid data format received");
        }

        // Process and normalize the movie data
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      });
  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  // Get unique genres from movies
  const uniqueGenres = [...new Set(movies
    .map(movie => movie.Genre?.Name)
    .filter(genre => genre))];

  // Filter movies based on search term and selected genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.Title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = !selectedGenre || (movie.Genre && movie.Genre.Name === selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const renderMovieGrid = () => {
    if (loading) {
      return <Col>Loading movies...</Col>;
    }

    if (error) {
      return <Col className="text-danger">{error}</Col>;
    }

    if (filteredMovies.length === 0) {
      return <Col>No movies found matching your criteria.</Col>;
    }

    return filteredMovies.map((movie) => (
      <Col key={movie._id} xs={8} sm={6} md={4} lg={3} className="mb-4">
        <MovieCard 
          movie={movie}
          onFavoriteToggle={(movieId) => {
            // Handle favorite toggling here
            console.log("Toggle favorite for movie:", movieId);
          }}
        />
      </Col>
    ));
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/users/:Username"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={6}>
                    <ProfileView user={user} token={token} onLoggedOut={onLoggedOut} />
                  </Col>
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={onLoggedIn} />
                  </Col>
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>It's empty.</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} setUser={setUser}/>
                  </Col>
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Row className="justify-content-center mb-4">
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          placeholder="Search movies"
                          value={search}
                          onChange={handleSearch}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Select value={selectedGenre} onChange={handleGenreChange}>
                          <option value="">All genres</option>
                          {uniqueGenres.sort().map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      {renderMovieGrid()}
                    </Row>
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};