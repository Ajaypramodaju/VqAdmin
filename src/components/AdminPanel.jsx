import { Box, Container, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Heading from './partials/Heading'
import styled from 'styled-components'
import GeneralTemplate from './templates/GeneralTemplate'
import { navDirections } from './utils/navDirections'
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'

function AdminPanel() {
    const history = useHistory()

    return (
        <GeneralTemplate>
            <Heading title={'Admin Panel'} />

            <Box my={5}>
                <Container maxWidth="sm">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <CustomButton
                                onClick={() =>
                                    history.push(navDirections.NOT_VERIFIED)
                                }
                            >
                                <NoEncryptionIcon />
                                <p>UnVerified</p>
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomButton
                                onClick={() =>
                                    history.push(navDirections.VERIFIED)
                                }
                            >
                                <HttpsRoundedIcon />
                                <p>Verified</p>
                            </CustomButton>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </GeneralTemplate>
    )
}

const CustomButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    padding: 20px;
    border-radius: 30px;
    width: 180px;
    height: 170px;
    box-shadow: inset 0px 0px 0px rgba(255, 255, 255, 0),
        inset 0px 0px 0px rgba(166, 180, 200, 0),
        -12px -12px 20px rgba(255, 255, 255, 0.8),
        10px 10px 24px rgba(166, 180, 200, 0.7);
    background: linear-gradient(134.17deg, #f2f2f7 4.98%, #ececf2 94.88%);
    transition: all ease-in-out 0.1s;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    p {
        color: #686868;
        text-align: center;
        font-size: 17px;
        transition: all ease-in-out 0.1s;
        margin-top: 10px;
    }

    svg {
        color: #1ea0f4;
        font-size: 4rem;
        transition: all ease-in-out 0.1s;
    }

    &:hover {
        box-shadow: inset -12px -12px 20px rgba(255, 255, 255, 0.8),
            inset 10px 10px 24px rgba(166, 180, 200, 0.7),
            0px 0px 0px rgba(255, 255, 255, 0),
            0px 0px 0px rgba(166, 180, 200, 0);
    }

    &:hover p {
        font-size: 15px;
    }
    &:hover svg {
        font-size: 5rem;
    }
`

export default AdminPanel
