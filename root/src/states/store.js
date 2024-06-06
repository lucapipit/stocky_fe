import loginSlice from './loginState';
import signinSlice from './signinState';
import searchSlice from './searchState';
import generalSlice from './generalState'; 
import sliceStore from './storeState';
import paymentSlice from './paymentState';
import orderSlice from './orderState';
import userLocationSlice from './userLocationState';
import geonamesSlice from './geonamesState';
import uploadFile from './uploadFileState';
import annScoreSlice from './annScoreState';
import outletSlice from './outletStore';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    login: loginSlice,
    signin: signinSlice,
    search: searchSlice,
    general: generalSlice,
    myStore: sliceStore,
    payment: paymentSlice,
    order: orderSlice,
    userLocation: userLocationSlice,
    uploadFile: uploadFile,
    geonames: geonamesSlice,
    annScore: annScoreSlice,
    outlet: outletSlice
})
const store = configureStore({
    reducer: rootReducer
})


export default store;