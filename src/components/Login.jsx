import { Container } from '@material-ui/core'
import { useState } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { useAuthContext } from './contexts/AuthContext'
import { navDirections } from './utils/navDirections'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { user, login, error } = useAuthContext()

    return (
        (!!!user && (
            <WelcomeScreen>
                <Container>
                    <Card>
                        <Heading>Welcome Admin</Heading>
                        {!!error && <ErrorMsg>{error}</ErrorMsg>}

                        <InputField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="email"
                            placeholder="Username"
                        />

                        <InputField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />

                        <FormButton onClick={() => login(username, password)}>
                            Login
                        </FormButton>
                    </Card>
                </Container>
            </WelcomeScreen>
        )) || <Redirect to={navDirections.ADMIN_PANEL} />
    )
}

const WelcomeScreen = styled.div`
    min-height: 100vh;
    padding-top: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Card = styled.div`
    background: #ffffff;
    border: 1px solid #dddddd;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    padding: 20px;
    margin: auto;
    margin-bottom: 30px;
    max-width: 450px;
    width: 100%;
`

const Heading = styled.h1`
    color: #252b42;
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 500;
`

const ErrorMsg = styled.p`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
`

const InputField = styled.input`
    width: 100%;
    outline: none;
    border: none;
    background: #f1f3f8;
    border-radius: 10px;
    color: #666;
    padding: 15px 20px;
    font-size: 16px;
    margin: 10px 0;

    &::placeholder {
        color: #9ea8bd;
    }
`

const FormButton = styled.button`
    background-color: #12389f;
    outline: none;
    border: none;
    color: #fff;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
    transition: transform ease-in-out 0.15s;
    font-size: 16px;

    &:hover {
        transform: scale(1.02);
    }
    &:active {
        transform: scale(0.98);
    }
`

export default Login
