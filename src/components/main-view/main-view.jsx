import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
<<<<<<< Updated upstream
=======
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

>>>>>>> Stashed changes

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItme("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);

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
<<<<<<< Updated upstream
  
  if (!user) {
    return ( 
    <>
    <LoginView onLoggedIn={(user, token) => {
    setUser(user);
    setToken(token);
    }} />
    or 
    <SignupView />
    </>
  );
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    
    fetch("https://movie-app-47zy.onrender.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => ({
        _id: movie._id,
        Title: movie.Title,
        Description: movie.Description,
        Genre: movie.Genre,
        Director: movie.Director,
        ImagePath: movie.ImagePath,
        Featured: movie.Featured,
      }));
      setMovies(moviesFromApi);
    })
    .catch((error) => console.error('Error fetching movies:', error));
}, [token]);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick= {() => { setSelectedMovie(null);
      }} />
    );
  }

  if (movies.length === 0) {
    return <div>the list is empty!</div>;
  } else {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>,
    <div>
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
=======

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/users/register"
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
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
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
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="mb-4"
      style={{ width: '100%', marginTop: '20px' }} 
    />
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
>>>>>>> Stashed changes
  );
};