import { ENCRYPT_MESSAGE, DECRYPT_MESSAGE } from "../actions/types";

const initialState = {
    message: '',
    messages: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ENCRYPT_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
         case DECRYPT_MESSAGE: 
            return {
                ...state,
                messages: action.payload
            }
         default:
             return state;
    } 
 }