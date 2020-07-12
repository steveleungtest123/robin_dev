import {
    TOGGLE_DARK_MODE, TOGGLE_IS_VIEW
} from 'redux/actions/app'

const initialState = {
    isDark: false,
    isViewListPanel: true,
    isViewContentPanel: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_DARK_MODE: 
            return {...state, isDark: action.isDark}
        case TOGGLE_IS_VIEW:
            return {...state, isViewListPanel: action.isViewListPanel}
        default:
            return state
    }
}

export default appReducer