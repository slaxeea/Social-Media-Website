// Import types
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNATHENTICATED } from "../types";

const initialState = {
    authenticated: false,
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
                ...action.payload
            }
        default:
            return state;
    }
}