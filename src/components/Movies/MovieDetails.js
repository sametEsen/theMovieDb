import React, { Component, Fragment } from 'react'
import MovieCard from './MovieCard'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
// import {
//     Button,  Card, CardImg, CardBody,
//     CardTitle, CardSubtitle, CardText
//   } from 'reactstrap';
  
const api = {
    url: "https://api.themoviedb.org/3/movie/",
    token: "733e8306f58919439c581f47d91fa5f7"
}

class MovieDetails extends Component{
    state = {
        movieid: this.props.location.state.movieid,
        movie: null
    }

    componentDidMount(){
        this.GetRelatedMovie();
    }

    GetRelatedMovie = () => {
        fetch(api.url + this.state.movieid + "?api_key=" + api.token , { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                this.setState({
                    movie: data
                });
            }
        });
    }

    render(){
        return(
            <Fragment>
            {
                this.state.movie && 
                <div className="position-relative">
                    <Container>
                        <MovieCard movie={this.state.movie} />
                    </Container>
                </div>
            }
            </Fragment>
        )
    }
}

export default MovieDetails