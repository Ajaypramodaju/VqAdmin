import { Box, Grid, Paper } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import FormAction from './FormAction'

function DataDisplayCard({ verified, activeData }) {
    const [data, setData] = useState([])

    const createData = () => {
        let newData = [
            ['Company Name', activeData?.companyName],
            ['Company Description', activeData?.companyDesc],
            ['Dept. Name', activeData?.deptName],
            ['Dept. Description', activeData?.deptDescription],
            ['Map Link', activeData?.mapLink],
            ['Mobile Number', activeData?.mobile],
            ['Email', activeData?.email],
            ['Starting Time', activeData?.startingTime],
            ['Ending Time', activeData?.endingTime]
        ]

        if (verified) {
            newData = [
                ...newData,
                ['Verified By', activeData?.verifiedBy],
                [
                    'Verified At',
                    !!activeData?.verifiedAt
                        ? new Date(activeData?.verifiedAt).toLocaleDateString()
                        : ''
                ]
            ]
        }

        return newData
    }

    useEffect(() => {
        setData(createData())
    }, [verified, activeData])

    return (
        <Box my={3}>
            <Paper>
                <Box padding="20px">
                    <Grid container spacing={3}>
                        {!!data?.length &&
                            data.map((el, key) => (
                                <React.Fragment key={key}>
                                    <Grid item xs={4}>
                                        {el[0]}
                                    </Grid>
                                    <Grid item xs={1}>
                                        {`:`}
                                    </Grid>
                                    <Grid item xs={7}>
                                        {el[1]}
                                    </Grid>
                                </React.Fragment>
                            ))}
                    </Grid>
                    {!!!verified && <FormAction />}
                </Box>
            </Paper>
        </Box>
    )
}

export default DataDisplayCard
