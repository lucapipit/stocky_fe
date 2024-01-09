import loginSlice from './loginState';
import signinSlice from './signinState';
import searchSlice from './searchState';
import generalSlice from './generalState'; 
import sliceStore from './storeState';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    login: loginSlice,
    signin: signinSlice,
    search: searchSlice,
    general: generalSlice,
    myStore: sliceStore
})
const store = configureStore({
    reducer: rootReducer
})


export default store;