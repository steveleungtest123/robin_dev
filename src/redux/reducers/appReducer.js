import {
    TOGGLE_DARK_MODE, TOGGLE_IS_VIEW, TOGGLE_LEFT_DRAWER
} from 'redux/actions/app'

const initialState = {
    isDark: false,
    isViewListPanel: true,
    isViewContentPanel: false,
    isShowLeftDrawer: false,
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_DARK_MODE: 
            return {...state, isDark: action.isDark}
        case TOGGLE_IS_VIEW:
            return {...state, isViewListPanel: action.isViewListPanel}
        case TOGGLE_LEFT_DRAWER:
            return {...state, isShowLeftDrawer: action.isShowLeftDrawer}
        default:
            return state
    }
}

export default appReducer