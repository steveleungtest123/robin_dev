import React, { useState } from 'react'
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
    },
    formControl: {
        marginTop: '20px',
        '& > button:not(:first-of-type)': {
            marginLeft: '10px'
        }
    }
}))

const Login = ({callRegisterPopup, submitFormAction, handleClose}) => {
    const classes = useStyles()
    const [accountId, setAccountId] = useState('')
    const [password, setPassword] = useState('')
    const [helperText, setHelperText] = useState({
        accountId: '',
        password: ''
    })
    const submitLogin = () => {
        handleClose()
    }
    return (
        <div className="login-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    className={classes.input} 
                    id="accountId" 
                    label="用戶名稱/電郵地址" 
                    variant="outlined"
                    helperText={helperText.accountId}
                />
                <TextField 
                    className={classes.input} 
                    type="password"
                    id="accountPassword" 
                    label="密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={helperText.password}
                />
            </form>
            <div className={classes.formControl}>
                <button className="button primary" onClick={submitLogin} type="button">登入</button>
                <button className="button outlined" onClick={callRegisterPopup} type="button">註冊</button>
            </div>
        </div>
    )
}

export default Login