import React, {} from 'react'
import './login.scss'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '315px'
    },
    input: {
        '&:not(:first-of-type)': {
            marginTop: '20px',
        }
    }
}))

const Login = () => {
    const classes = useStyles()
    return (
        <div className="login-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    className={classes.input} 
                    id="accountId" 
                    label="username or email" 
                    variant="outlined"
                    />
                <TextField 
                    className={classes.input} 
                    type="password"
                    id="accountPassword" 
                    label="password" 
                    variant="outlined"
                    autoComplete="off"
                />
            </form>
        </div>
    )
}

export default Login