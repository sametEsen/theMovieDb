import React, { Component, Fragment} from 'react'
import { Col, Row, Table, Button } from 'react-bootstrap';
import MovieTableRow from './MovieTableRow'

const api = {
    url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
    token: '733e8306f58919439c581f47d91fa5f7'
}
class Home extends Component{
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
                <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Poster</th>
                                <th>Name</th>
                                <th>Release Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {
                            this.state.movies.length > 0
                            ? 
                                this.state.movies.map((movie, i) => (
                                    <MovieTableRow key={movie.id} item={movie} />
                                ))
                            : 
                            null
                        }
                    </Table>                
                </Row>
                <Row>
                    <Col className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
                        <Button onClick={this.PreviousPage} disabled={this.state.page === 1}>
                            Previous
                        </Button>
                        |
                        <Button onClick={this.NextPage} disabled={this.state.page === this.state.total_pages}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Home