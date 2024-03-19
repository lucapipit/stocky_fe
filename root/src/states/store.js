import loginSlice from './loginState';
import signinSlice from './signinState';
import searchSlice from './searchState';
import generalSlice from './generalState'; 
import sliceStore from './storeState';
import paymentSlice from './paymentState';
import orderSlice from './orderState';
import pendingAnnState from './pendingAnnState';
import rejectedAnnState from './rejectedAnnState';
import acceptedAnnState from './acceptedAnnState';
import userLocationSlice from './userLocationState';
import uploadFile from './uploadFileState';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    login: loginSlice,
    signin: signinSlice,
    search: searchSlice,
    general: generalSlice,
    myStore: sliceStore,
    payment: paymentSlice,
    order: orderSlice,
    pendingAnn: pendingAnnState,
    rejectedAnn: rejectedAnnState,
    acceptedAnn: acceptedAnnState,
    userLocation: userLocationSlice,
    uploadFile: uploadFile

})
const store = configureStore({
    reducer: rootReducer
})


export default store;