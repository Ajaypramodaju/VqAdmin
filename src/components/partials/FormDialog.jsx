import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core'

function FormDialog({ open, code, setCode, type, handleAction, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Confirm Code</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Enter Unique Code to proceed to ${type} Department.`}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Unique Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAction} color="primary">
                    {type}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog
