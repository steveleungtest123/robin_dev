import React, { } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@material-ui/core'

const PopupModal = (props) => {
    const {
        open,
        handleClose
    } = props
    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                Modal title
                </DialogTitle>
            <DialogContent dividers>
                {props.children}
                {/* <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography> */}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Save changes
                    </Button>
            </DialogActions>
        </Dialog>

    )
}

export default PopupModal