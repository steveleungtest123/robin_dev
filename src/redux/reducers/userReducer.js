import {
    USER_LOGIN
} from 'redux/actions/user'
import cookies from 'helpers/cookies'

const initialState = {
    userInfo: JSON.parse(cookies.get('userInfo'))
}

const userReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case USER_LOGIN:
            cookies.set('userInfo', JSON.stringify(action.userInfo))
            return {...state, userInfo: action.userInfo}
        default:
            return state
    }
}

export default userReducer