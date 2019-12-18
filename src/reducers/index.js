import { combineReducers } from 'redux';
import showReducer from "./showReducer";
import encodedReducer from "./encodedReducer";

export default combineReducers({
    render: showReducer,
    encoded: encodedReducer
});