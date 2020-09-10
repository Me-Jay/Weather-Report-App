import React, { useRef, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import AuthContext from '../context/auth-context';

const SearchBarForm = styled(Form)`
    width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const SearchBar = ({ handleSearch }) => {
    const searchFieldEl = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchLocation = searchFieldEl.current.value;
        handleSearch(searchLocation);
    }

    return (
        <SearchBarForm className="mx-auto my-4" onSubmit={handleSubmit}>
            <Form.Row className="">
                <Col md={11} sm={12}>
                    <Form.Control className="w-100" type="text" placeholder="Enter city or country name" ref={searchFieldEl} />
                </Col>
                <Col md={1} sm={12}>
                    <Button type="submit" className="w-100">
                        Search
                </Button>
                </Col>
            </Form.Row>
        </SearchBarForm>
    );
}

export default SearchBar;