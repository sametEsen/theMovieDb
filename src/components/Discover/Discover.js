import React, { Component, Fragment} from 'react'
import StringLimitation from '../Utilities/StringLimitation'
import { Link } from 'react-router-dom'
import { Col, Row, Image, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Select from 'react-select';
import '../../styles/customDiscover.css'
import 'react-circular-progressbar/dist/styles.css';

const api = {
    searchUrl: 'https://api.themoviedb.org/3/discover/movie',
    genreUrl: 'https://api.themoviedb.org/3/genre/list',
    keywordListUrl: 'https://api.themoviedb.org/3/search/keyword',
    token: '733e8306f58919439c581f47d91fa5f7',
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/",
    last50Years: [],
    genresList: [],
    keyWordList: [],
    sortingList:[
        { label: "Popularity Descending", value: "popularity.desc" },
        { label: "Popularity Ascending", value: "popularity.asc" },
        { label: "Rating Descending", value: "vote_average.desc" },
        { label: "Rating Ascending", value: "vote_average.asc" },
        { label: "Release Date Descending", value: "primary_release_date.desc" },
        { label: "Release Date Ascending", value: "primary_release_date.asc" },
        { label: "Title (A-Z)", value: "title.asc" },
        { label: "Title (Z-A)", value: "title.desc" }
    ]
};

class Discover extends Component{
    state = { 
        page: 1,
        movies : [], 
        total_pages: 0,
        total_results: 0,
        year: 2019,
        sortBy: 'popularity.desc',
        genres: null,
        keywords: []
    }
    
    componentDidMount(){
        this.PrepareYears();
        this.GetMovies();
        this.GetGenres();
    }

    PrepareYears = () => {
        var d = new Date();
        var currentYear = d.getFullYear();
        var min = currentYear - 50;
        for (let index = currentYear; index >= min; index--) {
            api.last50Years.push(
                { label: index.toString(), value: index }
            );
        }
    }

    NextPage = () =>{
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
        var url = api.searchUrl + "?api_key=" + api.token + "&page=" + this.state.page;
        if(this.state.genres !== null){
            url += "&with_genres=" + this.state.genres;
        }
        if(this.state.sortBy.length > 0){
            url += "&sort_by=" + this.state.sortBy;
        }
        if(this.state.keywords.length > 0){
            this.state.keywords.forEach(element => {
                url += "&with_keywords=" + element;
            });
        }
        if(this.state.year > 0){
            url += "&year=" + this.state.year;
        }
        fetch(url, { method: 'GET' })
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

    GetGenres = () => {
        fetch(api.genreUrl + "?api_key=" + api.token, { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                data.genres.forEach(element => {
                    api.genresList.push({ label: element.name, value: element.id });
                });
            }
        });
    }

    handleKeywordChanges = (e) => {
        if(e.length > 3){
            var keyWordUrl = api.keywordListUrl + "?api_key=" + api.token + "&&query=" + e + "&page=1";
            fetch(keyWordUrl, { method: 'GET' })
            .then(response =>  response.json())
            .then(data => {
                if(data != null){
                    data.results.forEach(element => {
                        api.keyWordList.push({ label: element.name, value: element.id });
                    });
                }
            });
        }
    }

    YearFilter = (e) => {
        this.setState({
            year: e.value
        },
        () => { 
            this.GetMovies();
        });
    }

    SortFilter = (e) => {
        this.setState({
            sortBy: e.value
        },
        () => { 
            this.GetMovies();
        });
    }

    GenreFilter = (e) => {
        this.setState({
            genres: e.value
        },
        () => { 
            this.GetMovies();
        });
    }

    KeywordFilter = (e) => {
        var keyWordIds = [];
        if(e){
            keyWordIds = this.state.keywords;
            e.forEach(element => {
                keyWordIds.push(element.value);
            });
        }else{
            keyWordIds = [];
        }

        this.setState({
            keywords: keyWordIds
        },
        () => { 
            this.GetMovies();
        });
    }

    render(){
        return(
            <Fragment>
                <Row>
                    <Col>
                        <span>Year</span>
                        <Select options={api.last50Years} isSearchable={0} defaultValue={this.state.year} onChange={this.YearFilter}/>
                    </Col>
                    <Col>
                        <span>Sort By</span>
                        <Select options={api.sortingList} isSearchable={0} defaultValue={this.state.sortBy} onChange={this.SortFilter}/>
                    </Col>
                    <Col>
                        <span>Genres</span>
                        <Select options={api.genresList} placeholder="Type genres" onChange={this.GenreFilter}/>
                    </Col>
                    <Col>
                        <span>Keywords</span>
                        <Select options={api.keyWordList} placeholder="Type keywords" isMulti onInputChange={this.handleKeywordChanges} onChange={this.KeywordFilter}/>
                    </Col>
                </Row>
                <Row>
                    <h2>Discover New Movies</h2>
                </Row>
                <Row>
                    {
                        this.state.movies.length > 0 &&
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