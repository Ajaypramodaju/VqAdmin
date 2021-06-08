import { AuthContextProvider } from './components/contexts/AuthContext'
import { DataContextProvider } from './components/contexts/DataContext'
import Main from './components/Main'
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components'

// function App() {

  
function App() {
  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg', 
      loop: false,
      autoplay: true,
      animationData: require('./inext2.json')
    })
    }, [])
    return (
        
        <AuthContextProvider>
            <DataContextProvider>
            <Card>
             <div className="App">
              <div className="container" ref={container}></div>
             </div>
            </Card>
                <Main />
            </DataContextProvider>
        </AuthContextProvider>
    )
}

const Card = styled.div`
    background: #ffffff;
    border: 1px solid #dddddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    align-items: center;
    padding: 1px;
    margin: auto;
    margin-bottom: 1px;
    max-width: 250px;
    width: 100%;
`

export default App
