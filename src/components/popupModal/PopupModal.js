import React, { } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    Typography,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import './popupModal.scss'

const useStyles = makeStyles(theme => ({
    root: {
    },
    content: {

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}))

const PopupModal = (props) => {
    const {
        open,
        handleClose
    } = props
    const classes = useStyles()
    return (

        <Dialog className={classes.root} open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Typography>{props.title}</Typography>
                <IconButton 
                    aria-label="close" 
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.actions}
            </DialogActions>
        </Dialog>

    )
}

export default PopupModal