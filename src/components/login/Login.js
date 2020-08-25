import React, { useState } from 'react'
import './login.scss'
import { TextField, makeStyles, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import account from 'helpers/account'
import api from 'api/api';
import { useSnackbar } from 'notistack'
import {  useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'redux/actions/user';
import { toggleLeftDrawer } from 'redux/actions/app';

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
    }
}))

const Login = ({callRegisterPopup, submitFormAction, handleClose}) => {
    const classes = useStyles()
    const userReducer = useSelector(state => state.userReducer)
    console.log(userReducer)
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const { enqueueSnackbar } = useSnackbar() 
    const [inputs, setInputs] = useState({
        accountId: {
            value: '',
            required: true,
            helperText: '',
            valid: false
        },
        password: {
            value: '',
            required: true,
            helperText: '',
            valid: false
        }
    })
    const [enableSubmitButton, setSubmitButton] = useState(false)
    const accountIdOnChange = (value) => {
        const isEmail = account.checkEmail(inputs.accountId.value).error ? false : true
        const v = isEmail ? account.checkEmail(value) : account.checkUserName(value)
        const newInputs = {...inputs}
        newInputs.accountId.value = value
        newInputs.accountId.helperText = v.hint
        newInputs.accountId.valid = v.error ? false : true
        setInputs(newInputs)
        checkSubmitButton(newInputs)
    }
    const passwordOnChange = (value) => {
        const v = account.checkPassword(value)
        const newInputs = {...inputs}
        newInputs.password.value = value
        newInputs.password.helperText = v.hint
        newInputs.password.valid = v.error ? false : true
        setInputs(newInputs)
        checkSubmitButton(newInputs)
    }
    const checkSubmitButton = (fields) => {
        for (let key in fields) {
            if (fields[key].required && !fields[key].valid) return setSubmitButton(false)
        }
        return setSubmitButton(true)
    }
    const submitLogin = () => {
        checkSubmitButton(inputs)
        const isEmail = account.checkEmail(inputs.accountId.value).error ? false : true
        const param = {
            username: isEmail ? '' : inputs.accountId.value,
            email: isEmail ? inputs.accountId.value : '',
            password: inputs.password.value
        }
        const url = api.domain + '/users/login'
        const successCallback = (res) => {
            enqueueSnackbar('登入成功，歡迎你' + res.result[0].nickname, {
                variant: 'success'
            })
            dispatch(userLogin(res.result[0]))
            dispatch(toggleLeftDrawer(false))
            handleClose()
        }
        const failCallback = (err) => {
            console.log('login: ', err)
        }
        api.postRequest(url, param, {}, successCallback, failCallback)
    }
    return (
        <div className="login-form">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    className={classes.input} 
                    id="accountId" 
                    label="用戶名稱/電郵地址" 
                    variant="outlined"
                    helperText={inputs.accountId.helperText}
                    error={inputs.accountId.helperText ? true : false}
                    onChange={(e) => accountIdOnChange(e.target.value)}
                />
                <TextField 
                    className={classes.input} 
                    type={showPassword ? "text" : "password"}
                    id="accountPassword" 
                    label="密碼"
                    variant="outlined"
                    autoComplete="off"
                    helperText={inputs.password.helperText}
                    error={inputs.password.helperText ? true : false}
                    onChange={(e) => passwordOnChange(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
            </form>
            <div className={classes.formControl}>
                <button 
                    className="button primary" 
                    onClick={submitLogin} 
                    type="button"
                    disabled={!enableSubmitButton}
                >
                    登入
                </button>
                <button 
                    className="button outlined" 
                    onClick={callRegisterPopup} 
                    type="button"
                >
                    註冊
                </button>
            </div>
        </div>
    )
}

export default Login