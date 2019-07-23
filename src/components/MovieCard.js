import React, { Component, Fragment } from 'react';
import { Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText
} from 'reactstrap';

const constants = {
  baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2"
}

class MovieCard extends Component {
  state = {
    movie: this.props.movie
  }
  render(){
    const BANNER = constants.baseImageUrl + this.state.movie.backdrop_path;
    return(
      <Fragment>
        <Row>
          <Col md={4}>
            <Card>
              <CardImg top width="100%" src={BANNER} alt="banner" />
              <CardBody>
                  <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">{this.state.movie.original_title}</CardTitle>
                  <CardSubtitle className="text-secondary mb-3 font-weight-light text-uppercase" style={{ fontSize: '0.8rem' }}>{this.state.movie.tagline}</CardSubtitle>
                  <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>
                    <div style={{textAlign: 'right'}}>Popularity : {this.state.movie.popularity}</div>
                  </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={8}>
            <Row>
              <Col style={{textAlign: 'right'}}>
                {
                  this.state.movie.genres.map((genre) => {
                    return <Badge variant="info" style={{margin: '2px'}} key={genre.id}>{genre.name}</Badge>
                })}
              </Col>
            </Row>
            <Row>
              <Col>
                <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
                  <Tab eventKey="overview" title="Overwie">
                    {this.state.movie.overview}
                  </Tab>
                  <Tab eventKey="title" title="Title">
                    {this.state.movie.title}
                  </Tab>
                  <Tab eventKey="releaseDate" title="Release Date">
                    {this.state.movie.release_date}
                  </Tab>
                  <Tab eventKey="votes" title="Vote Count / Avarage">
                    {this.state.movie.vote_count} / {this.state.movie.vote_average}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default MovieCard;