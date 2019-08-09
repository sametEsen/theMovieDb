import React, { Component } from 'react'
import { Col} from 'react-bootstrap';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import '../../styles/customHome.css'

const api = {
    baseImageUrl: "https://image.tmdb.org/t/p/w235_and_h235_face"
}

class PeopleCard extends Component{
    state = {
        popular_people: this.props.popular_people
    }
/*
to={{
    pathname: '/people-details',
    state: {
        popular_people: this.state.popular_people
    }
}}
*/
    render(){
        return(
            <React.Fragment>
                <Col xs={6} md={3} style={{ marginBottom: '10px' }}>
                    <Card style={{ width: '14rem' }}>
                        <CardImg variant="top" src={api.baseImageUrl + this.state.popular_people.profile_path} />
                        <CardBody>
                            <CardTitle>{this.state.popular_people.name}</CardTitle>
                            <CardText className="textOverFlow">
                                {
                                    this.state.popular_people.known_for.length > 0 && this.state.popular_people.known_for[0].name != null ?
                                        this.state.popular_people.known_for[0].name + 
                                        " (" + this.state.popular_people.known_for[0].first_air_date.substring(0, 4) + ")"
                                    : this.state.popular_people.known_for.length > 0 &&  this.state.popular_people.known_for[0].title != null ?
                                        this.state.popular_people.known_for[0].title + 
                                        " (" + this.state.popular_people.known_for[0].release_date.substring(0, 4) + ")"
                                    : null
                                }
                            </CardText>
                        </CardBody>
                    </Card> 
                </Col>
            </React.Fragment>
        )
    }
}

export default PeopleCard