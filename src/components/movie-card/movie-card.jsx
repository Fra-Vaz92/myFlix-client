import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({movie, isFavorite, onFavoriteToggle, username }) => {

  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setIsFav(prev => !prev);
    onFavoriteToggle(movie._id, !isFav);
  };

  return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button 
          variant={isFav ? "danger" : "secondary"} 
          onClick={handleFavoriteClick}
        >
          {isFav ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
