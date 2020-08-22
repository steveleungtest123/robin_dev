import React, { useState } from 'react'
import './register.scss'
import { TextField, makeStyles, Typography, InputAdornment, IconButton } from '@material-ui/core'
import account from 'helpers/account'
import api from 'api/api'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({
        accountId: {
            required: true,
            value: '',
            helperText: '',
            valid: false
        },
        nickname: {
            required: true,
            value: '',
            helperText: '',
            valid: false
        },
        accountEmail: {
            required: true,
            value: '',
            helperText: '',
            valid: false
        },
        password: {
            required: true,
            value: '',
            helperText: '',
            valid: false
        },
        passwordCheck: {
            required: true,
            value: '',
            helperText: '',
            valid: false
        }
    })
    const inputOnChange = (key, value) => {
        let res = {}
        switch (key) {
            case 'accountId':
                res = account.checkUserName(value)
                break;
            case 'nickname':
                res = account.checkNickname(value)
                break;
            case 'accountEmail':
                res = account.checkEmail(value)
                break;
            default:
                res = { error: 'Unexpected Error', hint: '! not input fields' }
        }
        const newInputs = { ...inputs }
        newInputs[key].value = value
        newInputs[key].helperText = res.hint
        newInputs[key].valid = res.error ? false : true
        setDisableSubmit(!checkSumbitButton(newInputs))
        setInputs(newInputs)
    }
    const passwordOnchange = (key, value) => {
        const newInputs = {...inputs}
        newInputs[key].value = value
        const pwdValidate1 = account.checkPassword(newInputs.password.value)
        const pwdValidate2 = account.checkPassword(newInputs.passwordCheck.value)
        const pwdConfirm = account.checkIsEqual(newInputs.password.value, newInputs.passwordCheck.value)
        newInputs.password.helperText = pwdValidate1.error ? 
                                            pwdValidate1.hint :
                                        pwdConfirm.error ?
                                            pwdConfirm.hint :
                                            null
        newInputs.password.valid = pwdValidate1.error ? false : true
        newInputs.passwordCheck.helperText = pwdValidate2.error ? 
                                            pwdValidate2.hint :
                                        pwdConfirm.error ?
                                            pwdConfirm.hint :
                                            null
        newInputs.passwordCheck.valid = pwdValidate2.error ? false : true
        setDisableSubmit(!checkSumbitButton(newInputs))
        setInputs(newInputs)
    }
    const checkSumbitButton = (theInputs) => {
        var temp = theInputs ? theInputs : inputs
        for (var key in temp) {
            if (temp[key].required && !temp[key].valid) return false
        }
        return true
    }
    const submitRegister = () => {
        for (let key in inputs) {
            if (!inputs[key].valid) return
        }
        const param = {
            username: inputs.accountId.value,
            nickname: inputs.nickname.value,
            password: inputs.password.value,
            email: inputs.accountEmail.value
        }
        const url = api.domain + '/users/register'
        const successCallback = (res) => {
            if (res.error) {
                let msg = api.sqlErrorMessage(res.error)
                console.log(msg)
                return
            }
            if (submitFormAction) submitFormAction(res)
        }
        const failCallback = (err) => {
            console.log(err)
        }
        api.postRequest(url, param, {}, successCallback, failCallback)
    }
    return (
        <div className="register-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.input}
                    id="accountId"
                    label="用戶帳號"
                    variant="outlined"
                    helperText={inputs.accountId.helperText}
                    onChange={(e) => inputOnChange('accountId', e.target.value)}
                    error={inputs.accountId.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    id="nickname"
                    label="用戶匿稱"
                    variant="outlined"
                    helperText={inputs.nickname.helperText}
                    onChange={(e) => inputOnChange('nickname', e.target.value)}
                    error={inputs.nickname.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    id="accountEmail"
                    label="電郵地址"
                    variant="outlined"
                    helperText={inputs.accountEmail.helperText}
                    onChange={(e) => inputOnChange('accountEmail', e.target.value)}
                    error={inputs.accountEmail.helperText ? true : false}
                />
                <TextField
                    className={classes.input}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    label="密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={inputs.password.helperText}
                    onChange={(e) => passwordOnchange('password', e.target.value)}
                    error={inputs.password.helperText ? true : false}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <TextField
                    className={classes.input}
                    type={showPassword ? "text" : "password"}
                    id="passwordCheck"
                    label="再次輸入密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={inputs.passwordCheck.helperText}
                    onChange={(e) => passwordOnchange('passwordCheck', e.target.value)}
                    error={inputs.passwordCheck.helperText ? true : false}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />

                <div className={classes.formControl}>
                    <button
                        className="button"
                        type="button"
                        onClick={submitRegister}
                        disabled={disableSubmit}
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