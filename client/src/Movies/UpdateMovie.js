import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
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
            axios.get(`http://localhost:3000/api/movies/${params.id}`)
                .then(res =>{
                    console.log(res)
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
            stars: [{
                ...movie.stars,
                [event.target.name]: event.target.value
            }]
        });
    };

    const handleSubmit = event =>{
        event.preventDefault();
        axios.put(`http://localhost:3000/api/movies/${movie.id}`, movie)
            .then(res =>{
                console.log(res)
            })
            .catch(error =>{
                console.log(error)
            });
    };

    return(
        <div>
            <h2>Update Movie:</h2>
        </div>
    );
};

export default UpdateForm;