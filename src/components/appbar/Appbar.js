import React, { } from 'react'
import './appbar.scss'
import MenuIcon from '@material-ui/icons/Menu';
import ThemifiedSwitch from 'components/switch/ThemifiedSwitch'
import { IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, toggleLeftDrawer } from 'redux/actions/app';

const Appbar = () => {
    const appState = useSelector(state => state.appReducer)
    const dispatch = useDispatch()
    return (
        <div className="app-bar container">
            <div className="app-bar-start">
                <IconButton
                    onClick={() => dispatch(toggleLeftDrawer(true))}
                >
                    <MenuIcon
                    />
                </IconButton>
                <ThemifiedSwitch
                    customProps={{
                        color: '#EEE',
                        checkedColor: '#EEE',
                        trackColor: '#FFEEE2'
                    }}
                    standardProps={{
                        checked: appState.isDark,
                        onChange: (e) => dispatch(toggleDarkMode(!appState.isDark))
                    }}
                />
            </div>
            <div className="app-bar-end">
                <h4>故事羅賓漢</h4>
            </div>
        </div>
    )
}

export default Appbar