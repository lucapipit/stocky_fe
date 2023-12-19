import loginSlice from './loginState';
import signinSlice from './signinState';
import searchSlice from './searchState';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    login: loginSlice,
    signin: signinSlice,
    search: searchSlice,
})
const store = configureStore({
    reducer: rootReducer
})


export default store;