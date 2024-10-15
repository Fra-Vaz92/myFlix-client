import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"; 

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token)
      return;

    fetch("https://movie-app-47zy.onrender.com/movies", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
       return{
        _id: movie._id,
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
}) .catch((error) => console.error('Error fetching movies:', error));
  },  [token]);
  
  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={12} className="text-center my-3">
        <h1>MyFlix App</h1>
        </Col>
        <Col md={5}></Col>
   
    <LoginView onLoggedIn={(user, token) => {
    setUser(user);
    setToken(token);
    }} />
        <Col md={12} className="text-center my-3">
          <span>or</span>
        </Col>
        <Col md={5}></Col>
    <SignupView />
    </Row>
    );
  }

  if (selectedMovie) {
    return (
      <Col md={8} style={{ border: "1px solid black" }}><MovieView style={{ border: "1px solid green" }}
      movie={selectedMovie} onBackClick= {() => setSelectedMovie(null)}
      />
    </Col>
    );
  }

  if (movies.length === 0) {
    return <div>the list is empty!</div>;
  } else {
  return (
    <div>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
    </div>,
    <div>
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
}
};