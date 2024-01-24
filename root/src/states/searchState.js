import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    Data: [],
    search:''
};

const searchSlice = createSlice({
    name: 'apiSearch',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.Data = state.Data.filter((el) => el.name.toLowerCase().includes(state.search.toLowerCase()));
        },

    }
});

const {setSearch} = searchSlice.actions;
export default searchSlice.reducer

