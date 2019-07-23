import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';


class Layout extends Component {
  
    render () {
      return (
        <Fragment>
  
            <Header />
            
            <main className="my-5 py-5">
                <Container className="px-0">{this.props.children}</Container>
            </main>
            
        </Fragment>
      );
    }
  }

export default Layout