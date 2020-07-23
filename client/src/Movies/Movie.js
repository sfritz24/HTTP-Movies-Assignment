import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleDelete = event =>{
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res =>{
        setMovieList(movieList.filter(currentMovie =>{
          if (currentMovie.id === movie.id) {
            return !currentMovie
          } else {return currentMovie}
        }));
        push('/');
      })
      .catch(error =>{
        console.log(error)
      });
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className='update-bttn' onClick={() =>{push(`/update-movie/${movie.id}`, movie)}}>Update</div>
      <div className='delete-bttn' onClick={handleDelete}>Delete</div>
    </div>
  );
}

export default Movie;
