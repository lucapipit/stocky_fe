import loginSlice from './loginState';
import signinSlice from './signinState';
import searchSlice from './searchState';
import generalSlice from './generalState'; 
import sliceStore from './storeState';
import paymentSlice from './paymentState';
import orderSlice from './orderState';
import penRejSlice from './penRejState';
import userLocationSlice from './userLocationState';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    login: loginSlice,
    signin: signinSlice,
    search: searchSlice,
    general: generalSlice,
    myStore: sliceStore,
    payment: paymentSlice,
    order: orderSlice,
    penRej: penRejSlice,
    userLocation: userLocationSlice

})
const store = configureStore({
    reducer: rootReducer
})


export default store;