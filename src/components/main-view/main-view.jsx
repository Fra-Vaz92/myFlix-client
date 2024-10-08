import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItme("user"));
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
  );
}
};