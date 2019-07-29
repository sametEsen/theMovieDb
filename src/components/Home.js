import React, {Component, Fragment } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom'
import '../styles/customHome.css'

const api = {
    url: 'https://api.themoviedb.org/3/trending/all/week',
    token: '733e8306f58919439c581f47d91fa5f7',
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2"
}
class Home extends Component{
    state = { 
        page: 0,
        movies: {},
        randomMovie: {},
        popularPeople: []
    }

    componentDidMount(){
        this.GetTrendingMovies();
    }

    GetTrendingMovies = () => {
        const min = 1;
        const max = 100;
        const rand = Math.floor(min + Math.random() * (max - min));
        
        fetch(api.url + "?page=" + rand + "&api_key=" + api.token , { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                this.setState({ 
                    page: data.page,
                    movies: data.results,
                    randomMovie: data.results[Math.floor(Math.random() * 
                        data.results.length)]
                });
            }
        });
    }

    GetPopularPeople = () => {
        fetch(api.peopleUrl + "?api_key=" + api.token , { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                this.setState({ 
                    popularPeople: data.results
                });
            }
        });
    }

    render(){
        return(
            <Fragment>
                {
                    this.state.movies.length > 0 ? 
                    <Row>
                        <Col xs={6} md={3}>
                            <Row>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[0].id
                                        }
                                    }}>
                                        <Card>
                                            <CardImg top src={api.baseImageUrl + this.state.movies[0].poster_path} alt={this.state.movies[0].title} />
                                        </Card>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[1].id
                                        }
                                    }}>
                                        <CardImg top src={api.baseImageUrl + this.state.movies[1].poster_path} alt={this.state.movies[1].title} /> 
                                    </Link>
                                </Col>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[2].id
                                        }
                                    }}>
                                        <CardImg top src={api.baseImageUrl + this.state.movies[2].poster_path} alt={this.state.movies[2].title} />
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6} md={3}>
                            <Row>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[3].id
                                        }
                                    }}>
                                        <CardImg top src={api.baseImageUrl + this.state.movies[3].poster_path} alt={this.state.movies[1].title} />
                                    </Link>
                                </Col>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[4].id
                                        }
                                    }}>
                                        <CardImg top src={api.baseImageUrl + this.state.movies[4].poster_path} alt={this.state.movies[2].title} />
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{paddingRight: "0", paddingLeft: "0"}}>
                                    <Link to={{
                                        pathname: '/moviedetails',
                                        state: {
                                            movieid: this.state.movies[5].id
                                        }
                                    }}>
                                        <Card>
                                            <CardImg top src={api.baseImageUrl + this.state.movies[5].poster_path} alt={this.state.movies[0].title} />
                                        </Card>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6}>
                            <Link to={{
                                pathname: '/moviedetails',
                                state: {
                                    movieid: this.state.randomMovie.id
                                }
                            }}>
                                <Image src={api.baseImageUrl + this.state.randomMovie.poster_path} className="bgImage" style={{ width: "75%" }} />
                                <div className="bgText">
                                    <h2>{this.state.randomMovie.original_title}</h2>
                                    <p>{this.state.randomMovie.overview}</p>
                                </div>
                            </Link>
                        </Col>
                    </Row> 
                    : null
                }
                {/* {
                    this.state.popularPeople.length > 0 ?
                    <Row>
                        <Col>
                            {
                                this.state.popularPeople.map((people) => {
                                    return <h2 key={people.id}>{people.name}</h2>
                                })
                            }
                        </Col>
                    </Row>
                    : null
                } */}
            </Fragment>
        )
    }
}

export default Home