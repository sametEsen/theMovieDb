import React from 'react';
import {
    Col, Form, Input, Button
} from 'reactstrap';

const Search = () => (
    <Col className="d-none d-lg-flex justify-content-end">
        <Form inline>
            <Input type="search" className="mr-3" placeholder="Search React Courses" />
            <Button type="submit" color="info" outline>Search</Button>
        </Form>
    </Col>
);

export default Search