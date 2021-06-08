import { Container } from '@material-ui/core'
import { useState } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { useAuthContext } from './contexts/AuthContext'
import { navDirections } from './utils/navDirections'
// import React, { useEffect, useRef } from 'react';
// import lottie from 'lottie-web';
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { user, login, error } = useAuthContext()
    // const container = useRef(null)

    // useEffect(() => {
    //  lottie.loadAnimation({
    //   container: container.current,
    //   renderer: 'svg', 
    //   loop: false,
    //   autoplay: true,
    //   animationData: require('./inext2.json')
    // })
    // }, [])
   

    return (
        (!!!user && (
            <WelcomeScreen>
                <Container>
                    <Card>
                        {/* <Card1>
                        <div className="App">
                        <div className="container" ref={container}></div>
                        </div>
                        </Card1> */}
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
    min-height: 10vh;
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
    max-width: 400px;
    width: 100%;
`
// const Card1 = styled.div`
//     background: #ffffff;
//     border: 1px solid #dddddd;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
//     border-radius: 5px;
//     align-items: center;
//     padding: 1px;
//     margin: auto;
//     margin-bottom: 1px;
//     max-width: 250px;
//     width: 100%;
// `
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
