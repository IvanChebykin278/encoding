import { SHOW_TO_DECRYPT_PAGE, SHOW_TO_ENCRYPT_PAGE } from "../actions/types";

const initialState = {
    component: 'encrypt'
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_TO_ENCRYPT_PAGE:
            return {
                ...state,
                component: action.payload
            }
         case SHOW_TO_DECRYPT_PAGE: 
            return {
                ...state,
                component: action.payload
            }
         default:
             return state;
    } 
 }