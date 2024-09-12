import { combineReducers } from "@reduxjs/toolkit";
import auth from './auth'
import error from './error'

export default combineReducers({
    auth,
    error
});