import React, { useRef, useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/auth-context'

const { Text, Row, Label } = Form;

const AuthForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const FormText = styled(Text)`
    line-height: 1.5;
    vertical-align: center;
`;

const FormLabel = styled(Label)`
    float: left;
`;

const FormRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RegisterLink = styled(Link)``;


const AuthPage = () => {
    const emailEl = useRef();
    const passwordEl = useRef();
    const auth = useContext(AuthContext);

    const [error, setError] = useState(null);

    const makeId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (var i = 0; i < charactersLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = event => {
        event.preventDefault();

        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if (!email && !password) {
            return;
        }

        const storedDetails = JSON.parse(localStorage.getItem(email));

        if (!storedDetails) {
            setError("User does not exist");
            return;
        }

        const storedEmail = storedDetails.email;
        const storedPassWord = storedDetails.password;



        if (password !== storedPassWord) {
            setError("Invalid Credentials!");
            return;
        }

        const token = makeId(5);
        auth.login(token, email);
    }
    return (
        <AuthForm onSubmit={handleSubmit} className="mx-auto border p-3 mt-5">
            <h3>Login</h3>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            <Form.Group controlId="formBasicEmail">
                <FormLabel>Username</FormLabel>
                <Form.Control type="email" placeholder="Enter email" ref={emailEl} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FormLabel className="">Password</FormLabel>
                <Form.Control type="password" placeholder="Password" ref={passwordEl} />
            </Form.Group>

            <FormRow className="">
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <FormText className="text-muted align-middle">
                    Dont have an account?
                <RegisterLink to="/register"> Register here!</RegisterLink>
                </FormText>
            </FormRow>
        </AuthForm>
    );
}

export default AuthPage;