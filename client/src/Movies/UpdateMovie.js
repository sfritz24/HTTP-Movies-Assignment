import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props =>{
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() =>{
        if (location.state) {
            setMovie(location.state);
        } else {
            axios.get(`http://localhost:5000/api/movies/${params.id}`)
                .then(res =>{
                    setMovie(res.data)
                })
                .catch(error =>{
                    console.log(error)
                });
        };
    }, []);

    const handleChange = event =>{
        event.persist();
        setMovie({
            ...movie,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = event =>{
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res =>{
                props.setMovieList(res.data);
            })
            .catch(error =>{
                console.log(error)
            });
    };

    return(
        <div>
            <h2>Update Movie:</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:&nbsp;
                    <input
                        type='text'
                        name='title'
                        onChange={handleChange}
                        value={movie.title}
                    />
                </label>
                <label>Director:&nbsp;
                    <input
                        type='text'
                        name='director'
                        onChange={handleChange}
                        value={movie.director}
                    />
                </label>
                <label>MetaScore:&nbsp;
                    <input
                        type='text'
                        name='metascore'
                        onChange={handleChange}
                        value={movie.metascore}
                    />
                </label>
                <label>Stars:&nbsp;
                    {
                        movie.stars.map((star) =>(
                            <input
                                type='text'
                                name='star'
                                onChange={handleChange}
                                value={star}
                                key={star}
                            />
                        ))
                    }
                </label>
                <button>Submit Changes</button>
            </form>
        </div>
    );
};

export default UpdateForm;