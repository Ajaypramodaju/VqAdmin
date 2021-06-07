import { useEffect, useState } from 'react'
import { useDataContext } from './contexts/DataContext'
import Heading from './partials/Heading'
import { useHistory } from 'react-router-dom'
import { navDirections } from './utils/navDirections'
import GeneralTemplate from './templates/GeneralTemplate'
import { structureData } from './utils/structureData'
import { NoDataFound } from './styled/NoDataFound'
import CustomTable from './partials/CustomTable'
import { createRows, tableHeaders } from './utils/createRows'

function DisplayTable({ verified }) {
    const [response, setResponse] = useState([])

    const { companyData, unVerifiedData, setActiveData } = useDataContext()

    const history = useHistory()

    function viewDetails(item) {
        setActiveData(item)
        history.push(
            verified
                ? navDirections.DISPLAY_DETAILS_VERIFIED
                : navDirections.DISPLAY_DETAILS
        )
    }

    useEffect(() => {
        verified
            ? setResponse(structureData(true, companyData))
            : setResponse(structureData(false, companyData, unVerifiedData))
    }, [unVerifiedData, companyData, verified])

    return (
        <GeneralTemplate>
            <Heading title={verified ? 'Verified' : 'Not Verified'} />

            {(!!response?.length && (
                <CustomTable
                    headers={tableHeaders}
                    rows={createRows(response)}
                    viewDetails={viewDetails}
                    data={response}
                />
            )) || <NoDataFound>No Data Found</NoDataFound>}
        </GeneralTemplate>
    )
}

export default DisplayTable
