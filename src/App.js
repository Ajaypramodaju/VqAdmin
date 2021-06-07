import { AuthContextProvider } from './components/contexts/AuthContext'
import { DataContextProvider } from './components/contexts/DataContext'
import Main from './components/Main'

function App() {
    return (
        <AuthContextProvider>
            <DataContextProvider>
                <Main />
            </DataContextProvider>
        </AuthContextProvider>
    )
}

export default App
