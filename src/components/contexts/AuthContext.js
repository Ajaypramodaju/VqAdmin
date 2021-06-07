import { useState, createContext, useContext } from 'react'
import { DB } from '../../firebase'
import CustomDialog from '../partials/CustomDialog'

const authContext = createContext()

export const useAuthContext = () => useContext(authContext)

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

    const logout = () => setOpenDialog(true)

    const handleCloseDialog = () => setOpenDialog(false)

    /* LOGIN */

    const login = (email, password) => {
        setError('')

        const superAdminCredRef = DB.ref()
        superAdminCredRef
            .child('main')
            .child('SuperAdminCredentials')
            .child(email?.split('@')[0])
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userDetails = snapshot.val()
                    if (
                        userDetails?.uname === email &&
                        userDetails?.password === password
                    ) {
                        setUser(userDetails)
                    } else {
                        setError('! Error Occured')
                    }
                } else {
                    setError('! Error Occured')
                }
            })
            .catch(() => {
                setError('! Error Occured')
            })
    }

    /* LOGOUT */

    const handleLogout = () => {
        handleCloseDialog()
        setUser('')
    }

    const values = {
        user,
        login,
        logout,
        error
    }

    return (
        <authContext.Provider value={values}>
            {children}
            <CustomDialog
                title={'Are you Sure ?'}
                description={'You will be logged out from this sessions...'}
                successText={'Logout'}
                cancelText={'Cancel'}
                successFunc={handleLogout}
                open={openDialog}
                handleClose={handleCloseDialog}
            />
        </authContext.Provider>
    )
}
