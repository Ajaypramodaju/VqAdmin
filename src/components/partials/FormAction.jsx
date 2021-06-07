import { Box, Button, Grid } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useDataContext } from '../contexts/DataContext'
import { navDirections } from '../utils/navDirections'
import FormDialog from './FormDialog'
import firebase from 'firebase/app'
import { DB } from '../../firebase'

const formActionType = {
    APPROVE: 'Approve',
    DELETE: 'Delete'
}

function FormAction() {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState('')
    const [type, setType] = useState(formActionType?.APPROVE)

    const { user } = useAuthContext()
    const { activeData, unVerifiedData, setActiveData } = useDataContext()

    const history = useHistory()

    const handleClickOpen = (typeOfAction) => {
        setType(typeOfAction)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteDept = () =>
        DB.ref(`main/unverified/${activeData?.companyId}/${activeData?.deptId}`)
            .remove()
            .then(() => {
                console.log('Removed From Unverified')
                setActiveData('')
                history.push(navDirections.NOT_VERIFIED)
            })

    // const approveDept = () =>
    //     DB.ref(
    //         `main/company/${activeData?.companyId}/department/${activeData?.deptId}`
    //     )
    //         .set({
    //             ...unVerifiedData?.[activeData?.companyId]?.[
    //                 activeData?.deptId
    //             ],
    //             verifiedBy: user?.uname,
    //             verifiedAt: firebase.database.ServerValue.TIMESTAMP
    //         })
    //         .then(() => {
    //             console.log('Approved')
    //             deleteDept()
    //         })

    const saveDeptCredentials = () => {
        let { companyID, deptID, deptUsername, password } =
            unVerifiedData?.[activeData?.companyId]?.[activeData?.deptId]
                ?.Credentials

        DB.ref(`main/DepartmentCredentials/${deptUsername}`)
            .set({
                companyID: companyID,
                deptID: deptID,
                deptUsername: deptUsername,
                password: password
            })
            .then(() => {
                console.log('Approved')
                deleteDept()
            })
    }

    const approveDept = () => {
        let {
            activenow,
            avgt,
            currenttoken,
            descript,
            et,
            maxtokens,
            name,
            nextavailabletoken,
            ogDeptName,
            st
        } = unVerifiedData?.[activeData?.companyId]?.[activeData?.deptId]

        DB.ref(
            `main/company/${activeData?.companyId}/department/${activeData?.deptId}`
        )
            .set({
                activenow: activenow,
                avgt: avgt,
                currenttoken: currenttoken,
                descript: descript,
                et: et,
                maxtokens: maxtokens,
                name: name,
                nextavailabletoken: nextavailabletoken,
                ogDeptName: ogDeptName,
                st: st,

                verifiedBy: user?.uname,
                verifiedAt: firebase.database.ServerValue.TIMESTAMP
            })
            .then(() => {
                saveDeptCredentials()
            })
    }

    const handleAction = () => {
        handleClose()
        if (!!!type) return

        if (code !== user?.password) {
            alert('!! Invalid Code')
            setCode('')
            return
        }

        setCode('')

        type === formActionType.APPROVE ? approveDept() : deleteDept()
    }

    return (
        <Box my={3}>
            <Grid container spacing={3}>
                {[
                    ['Delete', formActionType.DELETE],
                    ['Approve', formActionType.APPROVE]
                ].map((el, key) => (
                    <Grid key={key} item xs={6}>
                        <Button
                            onClick={() => handleClickOpen(el[1])}
                            variant={key % 2 === 0 ? 'outlined' : 'contained'}
                            fullWidth
                            color={key % 2 === 0 ? 'secondary' : 'primary'}
                            size="large"
                        >
                            {el[0]}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <FormDialog
                open={open}
                code={code}
                setCode={setCode}
                type={type}
                handleAction={handleAction}
                handleClose={handleClose}
            />
        </Box>
    )
}

export default FormAction

/*

activenow: false,
avgt: 15,
currenttoken: -1
descript: "desc"
et: "20:00"
maxtokens: 15
name: "dep1"
nextavailabletoken: -1
ogDeptName: "Department 1"
st: "10:00"

companyID: 
"company10@gmail-com"
deptID: 
"dep1"
deptUsername: 
"dep1@company10@gmail-com"
password: 
"password"




*/
