import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
})

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'green',
        color: theme.palette.common.white,
        fontSize: 16
    },
    body: {
        fontSize: 16
    }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow)

function CustomTable({ headers = [], rows = [[]], viewDetails, data }) {
    const classes = useStyles()
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Sl.No.</StyledTableCell>

                        {headers.map((head, key) => (
                            <StyledTableCell key={key}>{head}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, key) => (
                        <StyledTableRow
                            key={key}
                            style={{ cursor: 'pointer' }}
                            onClick={() => viewDetails(data[key])}
                        >
                            <StyledTableCell align="center">
                                {key + 1}
                            </StyledTableCell>

                            {row.map((rowData, index) => (
                                <StyledTableCell key={index}>
                                    {rowData}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTable
