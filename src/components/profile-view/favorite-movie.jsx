import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss';


function FavoriteMovie ({favoriteMovieList}) {
const removeFav = (id) => {
  let token = localStorage.getItem('token');
  let url = `https://movie-app-47zy.onrender.com/users/${localStorage.getItem('user')}/movies/${id}`;
  axios.delete (url, {
    headers: {Authorization: `Bearer ${tooken}` },
  })
}

return (
  <Card>
    <Card.Body>
<Row>
<Col xs={2}>
<h4>Favorite Movies</h4>
</Col>
</Row>

<Row>
{favoriteMovieList.map(({ImagePath, Title, _id}) => {
  return (
    <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
      <Figure>
      <Link to={`/movies/${movie._id}`}>
      <Figure.Image src={ImagePath} alt={Title}>

      </Figure.Image>
      <Figure.Caption>
        {Title}
      </Figure.Caption>
      </Link>
      </Figure>
      <button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</button>
    </Col>
  )
})
}
</Row>
</Card.Body>
</Card>
)
}

FavoriteMovies.prototype = {
  FavoriteMovies: PropTypes.array.isRequired
};