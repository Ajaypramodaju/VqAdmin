import {
    Box,
    Paper,
    Tab,
    Tabs,
    Switch,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Button
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DB } from '../firebase'
import Heading from './partials/Heading'
import GeneralTemplate from './templates/GeneralTemplate'

function BugReports() {
    const [value, setValue] = useState(0)
    const [rajatApp, setRajatApp] = useState(true)
    const [activeBugs, setActiveBugs] = useState([])
    const [resolvedBugs, setResolvedBugs] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function structureData(data) {
        if (!!!data) return

        let newData = {}
        !!Object.keys(data).length &&
            Object.keys(data).forEach((appName) => {
                let appBugs = []
                !!Object.keys(data?.[appName]).length &&
                    Object.keys(data?.[appName]).forEach((userId) => {
                        !!Object.keys(data?.[appName]?.[userId]).length &&
                            Object.keys(data?.[appName]?.[userId]).forEach(
                                (timestamp) => {
                                    appBugs.push({
                                        userID: userId,
                                        time: timestamp,
                                        bug: data?.[appName]?.[userId]?.[
                                            timestamp
                                        ]
                                    })
                                }
                            )
                    })

                newData[appName] = appBugs
            })

        return newData
    }

    function deleteBug(bugData) {
        DB.ref(
            `main/BurgerReport/${rajatApp ? 'RajatsApp' : ''}/${
                bugData?.userID
            }/${bugData?.time}`
        )
            .remove()
            .then(() => {
                console.log('Removed From New Bugs')
            })
    }
    function resolveBug(bugData) {
        DB.ref(
            `main/ResolvedBurgerReport/${rajatApp ? 'RajatsApp' : ''}/${
                bugData?.userID
            }/${bugData?.time}`
        )
            .set(bugData?.bug)
            .then(() => {
                console.log('resolved')
                deleteBug(bugData)
            })
    }

    function getBugs() {
        var burgerRef = DB.ref(`main/BurgerReport`)
        burgerRef.on('value', (snapshot) => {
            const data = snapshot.val()
            setActiveBugs(structureData(data))
        })

        var resolvedRef = DB.ref(`main/ResolvedBurgerReport`)
        resolvedRef.on('value', (snapshot) => {
            const data = snapshot.val()
            setResolvedBugs(structureData(data))
        })
    }

    useEffect(() => {
        getBugs()
    }, [])

    return (
        <GeneralTemplate>
            <Heading title={'Bug Reports'} />

            <Wrapper>
                <Paper square className="paper_card">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <p>Other App</p>
                            <Switch
                                checked={rajatApp}
                                disabled
                                onChange={(e) => setRajatApp(e.target.checked)}
                                inputProps={{
                                    'aria-label': 'secondary checkbox'
                                }}
                            />
                            <p>Rajat App</p>
                        </Box>
                    </Box>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Tab label="Active" />

                        <Tab label="Resolved" />
                    </Tabs>
                </Paper>

                <div style={{ marginTop: '20px' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Sl.No.</TableCell>
                                    <TableCell>User Id</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Bug</TableCell>
                                    {value === 0 && (
                                        <TableCell align="center">
                                            Resolve
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(value === 0 && (
                                    <>
                                        {/* ACTIVE */}
                                        {!!activeBugs?.[
                                            rajatApp ? 'RajatsApp' : 'other'
                                        ]?.length &&
                                            activeBugs?.[
                                                rajatApp ? 'RajatsApp' : 'other'
                                            ]?.map((item, key) => (
                                                <TableRow key={key}>
                                                    <TableCell align="center">
                                                        {key + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.userID}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.time}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.bug}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            varaint="outlined"
                                                            color="primary"
                                                            onClick={() =>
                                                                resolveBug(item)
                                                            }
                                                        >
                                                            Resolve
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </>
                                )) || (
                                    <>
                                        {/* RESOLVED */}
                                        {!!resolvedBugs?.[
                                            rajatApp ? 'RajatsApp' : 'other'
                                        ]?.length &&
                                            resolvedBugs?.[
                                                rajatApp ? 'RajatsApp' : 'other'
                                            ]?.map((item, key) => (
                                                <TableRow key={key}>
                                                    <TableCell align="center">
                                                        {key + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.userID}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.time}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item?.bug}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </>
                                )}

                                {/* <TableRow>
                                    <TableCell align="center">Sl.No.</TableCell>
                                    <TableCell>User Id</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Bug</TableCell>
                                    {value === 0 && (
                                        <TableCell align="center">
                                            <Button
                                                varaint="outlined"
                                                color="primary"
                                            >
                                                Resolve
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Wrapper>
        </GeneralTemplate>
    )
}

const Wrapper = styled.div`
    .paper_card {
        width: 100%;
        padding-right: 20px;
        padding-top: 10px;
        .MuiTabs-flexContainer {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-evenly;
        }
    }
`

export default BugReports

/*
        from => data = {
            RajatsApp:{
                [userId]:{
                    [timestamp1]:'bug 1 here',
                    [timestamp2]:'bug 2 here',
                }
            }
        }

        to=> data = {
            RajatsApp = [
                {
                    userID:'......',
                    time:'.......',
                    bug:'bug 1 here'
                },
                {
                    userID:'......',
                    time:'.......',
                    bug:'bug 2 here'
                },
                .......
            ]
        }

        */
