import React, { useState } from 'react'
import './drawer.scss'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLeftDrawer } from 'redux/actions/app'
import { useHistory } from 'react-router-dom'
import PopupModal from 'components/popupModal/PopupModal'
import Login from 'components/login/Login'
import Register from 'components/register/Register'
import { Popper } from '@material-ui/core'

const DrawerLeft = () => {
    const appState = useSelector(state => state.appReducer)
    const userState = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const [showLoginModal, setLoginModal] = useState(false)
    const [showRegisterModal, setRegisterModal] = useState(false)
    console.log(userState)
    const navigateTo = (path) => {
        dispatch(toggleLeftDrawer(false))
        history.push(path)
    }
    const callLoginPopup = () => {
        setLoginModal(prev => !prev)
    }
    const callRegisterPopup = () => {
        setRegisterModal(prev => !prev)
    }
    const submitLogin = (data) => {
        
    }
    const submitRegister = (data) => {

    }
    return (
        <>
        <div className={`drawer ${appState.isShowLeftDrawer ? 'is-active' : ''}`}>
            <div className="drawer-body">
                <div className="drawer-body-top">
                    <div className="drawer-header">

                    </div>
                </div>
                <div className="drawer-body-main">
                    <div className="drawer-list-button"
                        onClick={() => navigateTo('/')}
                    >
                        首頁
                    </div>
                    {
                        userState.userInfo == null && 
                        <div className="drawer-list-button"
                            onClick={() => callLoginPopup()}
                        >
                            登入 / 註冊
                        </div>
                    }
                    <div className="drawer-list-button">
                        發表新故事
                    </div>
                    <div className="drawer-list-button">
                        最近閱讀
                    </div>
                    <div className="drawer-list-button">
                        我的書單
                    </div>
                    <div className="drawer-list-button">
                        我的故事
                    </div>
                    <div className="drawer-list-button">
                        記錄
                    </div>
                    {
                        userState.userInfo !== null &&
                        <div className="drawer-list-button" style={{backgroundColor: '#FA533A', color: 'white'}}>登出</div>
                    }
                </div>
            </div>
            <div className="drawer-overlay"
                onClick={() => dispatch(toggleLeftDrawer(false))}
            ></div>
        </div>
        <PopupModal 
            open={showLoginModal}
            handleClose={callLoginPopup}
            title="登入"
        >
            <Login 
                callRegisterPopup={callRegisterPopup}
                handleClose={callLoginPopup}
            />
        </PopupModal>
        <PopupModal
            open={showRegisterModal}
            handleClose={callRegisterPopup}
            title="註冊"
        >
            <Register 
                handleClose={callRegisterPopup}
            />
        </PopupModal>
        </>
    )
}

export default DrawerLeft