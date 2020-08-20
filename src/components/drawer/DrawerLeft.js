import React, { useState } from 'react'
import './drawer.scss'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLeftDrawer } from 'redux/actions/app'
import { useHistory } from 'react-router-dom'
import PopupModal from 'components/popupModal/PopupModal'
import Login from 'components/login/Login'
import { Button } from '@material-ui/core'

const DrawerLeft = () => {
    const appState = useSelector(state => state.appReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPopupModal, setPopupModal] = useState(false)
    const navigateTo = (path) => {
        dispatch(toggleLeftDrawer(false))
        history.push(path)
    }
    const callPopup = () => {
        // dispatch(toggleLeftDrawer(false))
        setPopupModal(prev => !prev)
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
                    <div className="drawer-list-button"
                        onClick={() => callPopup()}
                    >
                        登入 / 註冊
                    </div>
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
                </div>
            </div>
            <div className="drawer-overlay"
                onClick={() => dispatch(toggleLeftDrawer(false))}
            ></div>
        </div>
        <PopupModal 
            open={showPopupModal}
            handleClose={callPopup}
            title="登入"
            actions={
                <>
                    <button className="button primary">登入</button>
                    <button className="button outlined">註冊</button>
                </>
            }
        >
            <Login />
        </PopupModal>
        
        </>
    )
}

export default DrawerLeft