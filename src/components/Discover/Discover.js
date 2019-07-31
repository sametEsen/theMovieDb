import React, { Component, Fragment} from 'react'
import StringLimitation from '../Utilities/StringLimitation'
import { Link } from 'react-router-dom'
import { Col, Row, Image, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import '../../styles/customDiscover.css'
import 'react-circular-progressbar/dist/styles.css';

const api = {
    searchUrl: 'https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=horror&with_keywords=commedy&year=2019',
    url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
    token: '733e8306f58919439c581f47d91fa5f7',
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
}
class Discover extends Component{
    state = { 
        page: 1,
        movies : [], 
        total_pages: 0,
        total_results: 0,
        year: 2019,
        sortBy: 'popularity.desc',
        genres: '',
        keyword: ''
    }
    
    componentDidMount(){
        this.GetMovies();
    }

    NextPage = () =>{
        console.log(this.state.page);
            this.setState((prev, _) => {
                return(
                    {page: prev.page + 1}
                )
            },
            () => { 
                if(this.state.page <= this.state.total_pages)
                    this.GetMovies()
            }
        );
    }

    PreviousPage = () =>{
            this.setState((prev, _) => {
                return(
                    {page: prev.page - 1}
                )
            },
            () => { 
                if(this.state.page > 0)
                    this.GetMovies()
            }
        );
    }

    GetMovies = () => {
        fetch(api.url + "&page=" + this.state.page + "&api_key=" + api.token , { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                this.setState({ 
                    page: data.page,
                    movies: data.results,
                    total_pages: data.total_pages,
                    total_results: data.total_results
                });
            }
        });
    }

    render(){
        return(
            <Fragment>
                <Row>
                    <h2>Discover New Movies</h2>
                </Row>
                <Row>
                    {
                        this.state.movies.length > 0
                        ? 
                            this.state.movies.map((movie) => (
                                <Col key={movie.id} xs={12} md={6} className="discoverMoviewBox">
                                    <Row>
                                        <Col md={4}>
                                        <Image src={api.baseImageUrl + movie.poster_path} style={{width: '100%'}} />
                                        </Col>
                                        <Col md={8} style={{padding:'15px'}}>
                                            <Row>
                                                <Col md={2} style={{paddingLeft: '0'}}>
                                                    <CircularProgressbar
                                                        value={movie.vote_average * 10}
                                                        text={`${movie.vote_average * 10}%`}
                                                        background
                                                        backgroundPadding={5}
                                                        styles={buildStyles({
                                                            backgroundColor: "black",
                                                            textColor: "white",
                                                            textSize: "28px",
                                                            pathColor: "green",
                                                            trailColor: "transparent"
                                                        })}
                                                    />
                                                </Col>
                                                <Col md={10} style={{paddingLeft: '0', marginTop: '-5px'}}>
                                                    <StringLimitation text={movie.title} limit={25} styles={{marginBottom: '0', fontSize: '20px'}}/>
                                                    <span style={{width: '100%', fontSize: '11px'}}>{movie.release_date}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <StringLimitation text={movie.overview} limit={200}/>
                                            </Row>
                                            <Row className="discoverViewMore">
                                                <Link to={{
                                                    pathname: '/moviedetails',
                                                    state: {
                                                        movieid: movie.id
                                                    }
                                                }}>
                                                    Details
                                                </Link>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            ))
                        : 
                        null
                    }
                </Row>
                <Row style={{marginTop: "10px"}}>
                    <Col md={4} style={{textAlign: 'left'}}>
                        <Row>
                            <Button onClick={this.PreviousPage} disabled={this.state.page === 1}>
                                Previous
                            </Button>
                            |
                            <Button onClick={this.NextPage} disabled={this.state.page === this.state.total_pages}>
                                Next
                            </Button>
                        </Row>
                    </Col>
                    <Col md={{span:4, offset:4}} style={{textAlign: 'right'}}>
                        <span>Currently showing {this.state.page} of {this.state.total_pages} - </span>
                        <span>Total result: {this.state.total_results}</span>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Discover