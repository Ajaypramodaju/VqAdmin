import { Button, Container } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom'
import { useDataContext } from './contexts/DataContext'
import Heading from './partials/Heading'
import { navDirections } from './utils/navDirections'
import GeneralTemplate from './templates/GeneralTemplate'
import React from 'react'
import DataDisplayCard from './partials/DataDisplayCard'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'

function DisplayDetails({ verified }) {
    const { activeData } = useDataContext()
    const history = useHistory()

    const goBack = () =>
        history.push(
            verified ? navDirections.VERIFIED : navDirections.NOT_VERIFIED
        )

    return (
        (!!activeData && (
            <GeneralTemplate>
                <Heading title={'Details'} />

                <Container maxWidth="md">
                    <Button
                        color="primary"
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={goBack}
                    >
                        Back
                    </Button>
                    <DataDisplayCard
                        verified={verified}
                        activeData={activeData}
                    />
                </Container>
            </GeneralTemplate>
        )) || <Redirect to={navDirections.ADMIN_PANEL} />
    )
}

export default DisplayDetails
