import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Matrix',
      description:
          'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
      genre: 'Science Fiction',
      director: 'Lana Wachowski',
      actors: ['Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss'],
      releaseYear: 1999,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
    },
    {
      id: 2,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description:
          'A young hobbit, Frodo, embarks on a quest to destroy the One Ring.',
      genre: 'Fantasy',
      director: 'Peter Jackson',
      actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
      releaseYear: 2001,
      image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
    },
    {
      id: 3,
      title: 'Goodfather',
      description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      genre: 'Crime',
      director: 'Francis Ford Coppola',
      actors: ["Marlon Brando","Al Pacino","James Caan"],
      releaseYear: 1972,
      image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
  },

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>the list is empty!</div>;
  }
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
};
