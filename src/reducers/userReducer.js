import * as AC from "../actions/actionConst";
import { REHYDRATE } from "redux-persist";
import axios from "../utils/axios"

let initialState = {
    allUsers:[],
    loggedIn: undefined,
    isAuthenticated: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AC.LOGIN_USER:
            return Object.assign({}, state, {
                loggedIn: action.user,
                isAuthenticated: true
            })
        case AC.LOGOUT_USER:
            return Object.assign({}, state, {
                loggedIn: undefined,
                isAuthenticated: false
            })
        case AC.REGISTERED_USER:
            return Object.assign({}, state, {
                    allUsers:
                        [...state.allUsers,
                            action.user
                        ]
                }
            )
        case REHYDRATE:
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + (action.payload ? action.payload.user && action.payload.user.loggedIn ? action.payload.user.loggedIn.email : '' : '')
            console.log(action)
            return state
        
        default:
            return state;
    }
}
export default userReducer;