import React, { useState } from 'react'
import './register.scss'
import { TextField, makeStyles, Typography } from '@material-ui/core'
import account from 'helpers/account'
import api from 'api/api'

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            minWidth: '315px'
        }
    },
    input: {
        minHeight: '80px',
        '&:not(:first-of-type)': {
            marginTop: '20px',
        }
    },
    formControl: {
        marginTop: '20px',
        '& > button:not(:first-of-type)': {
            marginLeft: '10px'
        }
    },
    formFinal: {
        marginTop: '20px'
    }
}))


const Register = ({ handleClose, submitFormAction }) => {
    const classes = useStyles()
    const [enableSubmit, setEnableSubmit] = useState(true)
    const [pass, setPass] = useState({
        accountId: false,
        nickname: false,
        accountEmail: false,
        password: false,
        passwordCheck: false
    })
    const [accountId, setAccountId] = useState({
        value: '',
        helperText: ''
    })
    const [nickname, setNickname] = useState({
        value: '',
        helperText: ''
    })
    const [accountEmail, setAccountEmail] = useState({
        value: '',
        helperText: ''
    })
    const [password, setPassword] = useState({
        value: '',
        helperText: ''
    })
    const [passwordCheck, setPasswordCheck] = useState({
        value: '',
        helperText: ''
    })
    const checkSubmitButton = () => {
        console.log(pass)
        for (let key in pass) {

            if (!pass[key]) return setEnableSubmit(true)
        }
        return setEnableSubmit(false)
    }
    const submitRegister = () => {
        const param = {
            username: accountId.value,
            email: accountEmail.value,
            password: password.value,
            nickname: nickname.value
        }
        const url = "/users/register"
        const successCallback = (res) => {
            console.log(res)
        }
        console.log(param)
        const failCallback = (err) => {
            console.log(err)
        }
        console.log(api.domain + url)
        api.postRequest(api.domain + url, param, {}, successCallback, failCallback)
    }
    const usernameOnChange = (val) => {
        const ac = account.checkUserName(val)
        setPass(prev => ({ ...prev, accountId: ac.error ? false : true }))
        setAccountId({
            helperText: ac.hint,
            value: val
        })
        checkSubmitButton()
    }
    const emailOnChange = (val) => {
        const email = account.checkEmail(val)
        setPass(prev => ({ ...prev, accountEmail: email.error ? false : true }))
        setAccountEmail({
            helperText: email.hint,
            value: val
        })
        checkSubmitButton()
    }
    const passwordOnChange = (val) => {
        const pwd = account.checkPassword(val)
        const pwdC = account.checkIsEqual(val, passwordCheck.value)
        setPass(prev => ({
            ...prev,
            password: pwd.error ? false : true,
            passwordCheck: pwdC.error ? false : true
        }))
        setPassword({
            helperText: pwd.hint ? pwd.hint : pwdC.hint ? pwdC.hint : null,
            value: val
        })
        setPasswordCheck(prev => ({
            helperText: pwdC.hint,
            value: prev.value
        }))
        checkSubmitButton()
    }
    const passwordCheckOnChange = (val) => {
        const pwdC = account.checkIsEqual(password.value, val)
        console.log('pwdC: ', pwdC)
        setPass(prev => ({
            ...prev,
            passwordCheck: pwdC.error ? false : true
        }))

        setPassword(prev => ({
            helperText: pwdC.hint,
            value: prev.value
        }))

        setPasswordCheck({
            helperText: pwdC.hint,
            value: val
        })
        checkSubmitButton()
    }
    const nicknameOnChange = (val) => {
        const nn = account.checkNickname(val)
        setPass(prev => ({
            ...prev,
            nickname: nn.error ? false : true
        }))
        setNickname({
            helperText: nn.hint,
            value: val
        })
        checkSubmitButton()
    }
    return (
        <div className="register-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.input}
                    id="accountId"
                    label="用戶帳號"
                    variant="outlined"
                    helperText={accountId.helperText}
                    value={accountId.value}
                    onChange={(e) => usernameOnChange(e.target.value)}
                    error={accountId.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    id="nickname"
                    label="用戶匿稱"
                    variant="outlined"
                    helperText={nickname.helperText}
                    value={nickname.value}
                    onChange={(e) => nicknameOnChange(e.target.value)}
                    error={nickname.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    id="acountEmail"
                    label="電郵地址"
                    variant="outlined"
                    helperText={accountEmail.helperText}
                    value={accountEmail.value}
                    onChange={(e) => emailOnChange(e.target.value)}
                    error={accountEmail.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    type="password"
                    id="accountPassword"
                    label="密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={password.helperText}
                    value={password.value}
                    onChange={(e) => passwordOnChange(e.target.value)}
                    error={password.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    type="password"
                    id="accountPasswordCheck"
                    label="再次輸入密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={passwordCheck.helperText}
                    value={passwordCheck.value}
                    onChange={(e) => passwordCheckOnChange(e.target.value)}
                    error={passwordCheck.helperText ? true : false}
                />

                <div className={classes.formControl}>
                    <button 
                        className="button" 
                        type="button" 
                        onClick={submitRegister}
                        disabled={enableSubmit}
                    >
                        註冊
                    </button>
                    <button className="button" type="button" onClick={handleClose}>返回</button>
                </div>
            </form>
        </div>
    )
}

export default Register