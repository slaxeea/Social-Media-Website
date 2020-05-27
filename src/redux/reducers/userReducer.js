// Import types
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNATHENTICATED, LOADING_USER } from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications:[]
};

// export switch
export default function(state=initialState, action){
    switch(action.type){
        case SET_UNATHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNATHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}