import { Redirect, Route } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { navDirections } from './navDirections'

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { user } = useAuthContext()

    return (
        <Route
            {...rest}
            render={(props) =>
                !!user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={navDirections.LOGIN} />
                )
            }
        />
    )
}
