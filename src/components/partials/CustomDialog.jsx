import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'

function CustomDialog(props) {
    const {
        title,
        description,
        successText,
        cancelText,
        successFunc,
        open,
        handleClose
    } = props

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {cancelText}
                </Button>
                <Button onClick={successFunc} color="primary" autoFocus>
                    {successText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog
