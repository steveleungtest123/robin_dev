import { combineReducers } from 'redux'
import appReducer from 'redux/reducers/appReducer'
import userReducer from 'redux/reducers/userReducer'

export default combineReducers({
    appReducer,
    userReducer
})