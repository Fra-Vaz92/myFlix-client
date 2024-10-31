import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./main-view.scss";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (!token)
      return;

    fetch("https://movie-app-47zy.onrender.com/movies", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
       return{ _id: movie._id,
        Title: movie.Title,
        Description: movie.Description,
        Genre: movie.Genre,
        Actors:movie.actor,
        Director: movie.Director,
        ImagePath: movie.ImagePath,
        Featured: movie.Featured,
      };
    });
    setMovies(moviesFromApi);
})
  },  [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
}
const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
}
const updatedUser = user => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
}

const handleSearch = (e) => setSearch(e.target.value); // Update search term

  const handleGenreChange = (e) => setSelectedGenre(e.target.value); // Update selected genre

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter.toLowerCase()) &&
  (!selectedGenre || movie.Genre.Name === selectedGenre)
  );

  
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              !user ? (
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
              !user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={onLoggedIn}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/users/:Username"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    updatedUser={updatedUser}
                    onLoggedOut={onLoggedOut}
                  />
                </Col>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              movies.length === 0 ? (
                <p>Loading movies...</p>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <>
                  {movies.length === 0 ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <Row className="justify-content-md-center">
  <Col md={6}> {}
    <Form.Control
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
      className="mb-4"
      style={{ width: '100%', marginTop: '20px' }} 
    />
  </Col>
  <Col md={6}>
                        <Form.Select
                          value={selectedGenre}
                          onChange={handleGenreChange}
                        >
                          <option value="">All genres</option>
                          {[...new Set(movies.map((m) => m.Genre.Name))]
                            .sort()
                            .map((genre) => (
                              <option key={genre} value={genre}>
                                {genre}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
</Row>

{filteredMovies.length === 0 ? (
  <p>No movies found</p>
  ) : (
  <Row>
    {filteredMovies.map((movie) => (
   <Col className="mb-5" key={movie.id} md={3}>
      <MovieCard movie={movie} />
    </Col>
    ))}
    </Row>
    )}
    </>
      )}
    </>
    ) : (
   <Navigate to="/login" />
    )
      }
        />
       </Routes>
     </Row>
   </BrowserRouter>
  );
};