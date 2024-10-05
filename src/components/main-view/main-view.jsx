import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-app-47zy.onrender.com/movies")
    .then((response) => response.json());
  })
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
.catch((error) => {
  console.error("Error fetching movies:", error);
  setError(error.message);
  },  []);

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
    </div>
  );
}
};
