import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const { Label, Text, Row } = Form;
const RegisterForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const FormLabel = styled(Label)`
    float: left;
`;

const FormRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const FormText = styled(Text)`
    line-height: 1.5;
    vertical-align: center;
`;

const LoginLink = styled(Link)``;

const RegisterPage = () => {
    const [error, setError] = useState(null);
    const [complete, setComplete] = useState(false);

    const nameEl = useRef();
    const emailEl = useRef();
    const passwordEl = useRef();
    const confirmPasswordEl = useRef();

    const handleSubmit = event => {
        event.preventDefault();

        const name = nameEl.current.value;
        const email = emailEl.current.value;
        const password = passwordEl.current.value;
        const confirmPassword = confirmPasswordEl.current.value;

        if (!name || !email || !password || !confirmPassword) {
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const dataToSave = {
            name: name,
            email: email,
            password: password
        }

        console.log(JSON.stringify(dataToSave))
        localStorage.setItem(email, JSON.stringify(dataToSave));
        setComplete(true);
        setError(null);
    }

    return (
        <RegisterForm className="mx-auto border p-4 mt-5" onSubmit={handleSubmit}>
            <h3>Sign Up!</h3>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            {
                complete && <Alert variant="success">User added! You can now login</Alert>
            }
            <Form.Group controlId="formBasicEmail">
                <FormLabel>Name</FormLabel>
                <Form.Control type="text" ref={nameEl} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" ref={emailEl} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <FormLabel>Password</FormLabel>
                <Form.Control type="password" ref={passwordEl} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FormLabel className="">Confirm Password</FormLabel>
                <Form.Control type="password" ref={confirmPasswordEl} />
            </Form.Group>

            <FormRow>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <FormText className="text-muted align-middle">
                    Already have an account?
                <LoginLink to="/auth"> Log in!</LoginLink>
                </FormText>

            </FormRow>
        </RegisterForm>
    );
}

export default RegisterPage;