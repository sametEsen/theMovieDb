import React, {Component, Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PeopleCard from '../People/PeopleCard';

const api = {
    url: 'https://api.themoviedb.org/3/person/popular',
    token: '733e8306f58919439c581f47d91fa5f7',
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2"
}
class People extends Component{
    state = { 
        page: 1,
        total_pages: 0,
        total_results: 0, 
        popularPeople: []
    }

    componentDidMount(){
        this.GetPopularPeople();   
    }

    NextPage = () =>{
            this.setState((prev, _) => {
                return(
                    {page: prev.page + 1}
                )
            },
            () => { 
                if(this.state.page <= this.state.total_pages)
                    this.GetPopularPeople()
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
                    this.GetPopularPeople()
            }
        );
    }

    GetPopularPeople = () => {
        fetch(api.url + "?page=" + this.state.page + "&api_key=" + api.token , { method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            if(data != null){
                this.setState({ 
                    page: data.page,
                    total_pages: data.total_pages,
                    total_results: data.total_results, 
                    popularPeople: data.results
                });
            }
        });
    }

    render(){
        return(
            <Fragment>
                <Row>
                    <Col>
                        <h2>Popular People</h2>
                    </Col>
                </Row>
                <Row>
                {
                    this.state.popularPeople.length > 0 &&
                    this.state.popularPeople.map((people) => {
                        return <PeopleCard key={people.id} popular_people={people}></PeopleCard>
                    })
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

export default People