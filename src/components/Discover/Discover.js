import React, { Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image } from 'react-bootstrap';
import '../../styles/customDiscover.css'

const api = {
    url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
    token: '733e8306f58919439c581f47d91fa5f7',
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
}
class Discover extends Component{
    state = { 
        page: 1,
        movies : [], 
        total_pages: 0,
        total_results: 0
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
                                                <h4>{movie.original_title}</h4>
                                                <span style={{width: '100%', fontSize: '11px'}}>{movie.release_date}</span>
                                            </Row>
                                            <Row>
                                                <p>
                                                    {movie.overview.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview}
                                                </p>
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
            </Fragment>
        )
    }
}

export default Discover