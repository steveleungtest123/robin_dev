import React, { useState } from 'react'
import './register.scss'
import { TextField, makeStyles } from '@material-ui/core'
import account from 'helpers/account'


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


const Register = ({handleClose, submitFormAction}) => {
    const classes = useStyles()
    const [accountId, setAccountId] = useState('')
    const [accountEmail, setAccountEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [helperText, setHelperText] = useState({
        accountId: '',
        accountEmail: '',
        password: '',
        passwordCheck: ''
    })
    const submitRegister = () => {
        account.checkUserName(accountId)
        account.checkEmail(accountEmail)
        account.checkPassword(password)
        account.checkIsEqual(password, passwordCheck)
    }
    return(
        <div className="register-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    className={classes.input} 
                    id="accountId" 
                    label="用戶名稱" 
                    variant="outlined"
                    helperText={helperText.accountId}
                    value={accountId}
                    onChange={setAccountId}
                />
                <TextField
                    className={classes.input}
                    id="acountEmail"
                    label="電郵地址"
                    variant="outlined"
                    helperText={helperText.accountEmail}
                    value={accountEmail}
                    onChange={setAccountEmail}
                />
                <TextField 
                    className={classes.input} 
                    type="password"
                    id="accountPassword" 
                    label="密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={helperText.password}
                    value={password}
                    onChange={setPassword}
                />
                <TextField 
                    className={classes.input} 
                    type="password"
                    id="accountPasswordCheck" 
                    label="再次輸入密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={helperText.passwordCheck}
                    value={passwordCheck}
                    onChange={setPasswordCheck}
                />

                <div className={classes.formControl}>
                    <button className="button" type="button" onClick={submitRegister}>註冊</button>
                    <button className="button" type="button" onClick={handleClose}>返回</button>
                </div>
            </form>
        </div>
    )
}

export default Register