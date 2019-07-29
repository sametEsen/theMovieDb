import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout'
import Home from './components/Home';
import MovieDetails from './components/Movies/MovieDetails'
import Discover from './components/Discover/Discover';
import People from './components/People/People';

class App extends Component {
  render(){
    return(
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/discover' component={Discover} />
        <Route exact path='/popular-people' component={People} />
        <Route exact path='/moviedetails' component={MovieDetails} />
      </Layout>
    )
  }
}

export default App;