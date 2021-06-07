import { useState, useEffect, createContext, useContext } from 'react'
import { DB } from '../../firebase'
import { useAuthContext } from './AuthContext'

const dataContext = createContext()

export const useDataContext = () => useContext(dataContext)

export function DataContextProvider({ children }) {
    const [companyData, setCompanyData] = useState([])
    const [unVerifiedData, setUnVerifiedData] = useState([])
    const [activeData, setActiveData] = useState('')

    const { user } = useAuthContext()

    function getCompanyData() {
        if (!!!user || !!companyData?.length) return
        console.log('Getting Company data...')

        var companyRef = DB.ref(`main/company`)
        companyRef.on('value', (snapshot) => {
            const data = snapshot.val()
            setCompanyData(data)
        })
    }

    function getUnverifiedData() {
        if (!!!user || !!unVerifiedData?.length) return
        console.log('Getting Unverified data...')

        var unverifiedRef = DB.ref(`main/unverified`)
        unverifiedRef.on('value', (snapshot) => {
            const data = snapshot.val()

            setUnVerifiedData(data)
        })
    }

    useEffect(() => {
        getUnverifiedData()
        getCompanyData()
    }, [user])

    const values = {
        companyData,
        unVerifiedData,
        activeData,
        setActiveData
    }

    return (
        <dataContext.Provider value={values}>{children}</dataContext.Provider>
    )
}
