import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddUser from './AddUser'
import AdminPanel from './AdminPanel'
import BugReports from './BugReports'
import DisplayDetails from './DisplayDetails'
import DisplayTable from './DisplayTable'
import Login from './Login'
import { navDirections } from './utils/navDirections'
import ProtectedRoute from './utils/ProtectedRoute'

function Main() {
    return (
        <Router>
            <Switch>
                <Route path={navDirections.LOGIN} exact component={Login} />

                <ProtectedRoute
                    path={navDirections.ADMIN_PANEL}
                    exact
                    component={AdminPanel}
                />
                <ProtectedRoute
                    path={navDirections.ADD_USER}
                    exact
                    component={AddUser}
                />
                <ProtectedRoute
                    path={navDirections.BUG_REPORT}
                    exact
                    component={BugReports}
                />

                <ProtectedRoute path={navDirections.VERIFIED} exact>
                    <DisplayTable verified={true} />
                </ProtectedRoute>

                <ProtectedRoute path={navDirections.NOT_VERIFIED} exact>
                    <DisplayTable verified={false} />
                </ProtectedRoute>

                <ProtectedRoute path={navDirections.DISPLAY_DETAILS} exact>
                    <DisplayDetails verified={false} />
                </ProtectedRoute>

                <ProtectedRoute
                    path={navDirections.DISPLAY_DETAILS_VERIFIED}
                    exact
                >
                    <DisplayDetails verified={true} />
                </ProtectedRoute>

                <Route
                    path={navDirections.ERROR}
                    exact
                    component={AdminPanel}
                />
            </Switch>
        </Router>
    )
}

export default Main
