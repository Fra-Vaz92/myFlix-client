import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({movies}) => {
  const{movieId} = useParams();
  const movie = movies.find((b) => b.id === movieId);

  useEffect(() => {
    if(user && user.FavoriteMovies)  {
        const isFavorite = user.FavoriteMovies.includes(movieId);
        setIsFavorite(isFavorite);
    }
}, [movieId, user]);

const addtoFavorite = () => {
    fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
    {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }).then((response) => {
        if (response.ok) {
          return response.json();
        }
    })
    .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true);
    })
    .catch((e) => {
        console.log(e);
    });       
};
const removefromFavorite = () => {
    fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
    {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
    }).then((response) => {
        if (response.ok) {
          return response.json();
        }
    })
    .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false);
    })
    .catch((e) => {
    console.log(e);
    });       
};
return (
    
    <Card className="h-100 w-100">
    <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
           <Card.Header className="text-center fs-1">{movie.title}</Card.Header>
           <br></br>
                <Card.Text><strong>Director</strong> - {movie.director.name}</Card.Text>
                <Card.Text><strong>Genre</strong> - {movie.genre.name}</Card.Text>
                <Card.Text><strong>Description</strong> - {movie.description}</Card.Text>
        <Link to={`/`}>
            <button className="back-button">Back</button>
        </Link>  
        <div className="mt-1"> 
            {isFavorite ? (
                <Button variant="danger" onClick={removefromFavorite}>Remove from favorite</Button>
            ) : (
                <Button variant="primary" onClick={addtoFavorite}>Add to favorite</Button>   
            )}
        </div>
        </Card.Body>
    </Card>
    
)
}

  MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
  };
