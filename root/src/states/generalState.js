import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isHamMenuOpen: false
};

const generalSlice = createSlice({
    name: 'generalStates',
    initialState,
    reducers: {
        setIsHamMenuOpen: (state, action) => {
            state.isHamMenuOpen = action.payload
        }
    }
});

export const { setIsHamMenuOpen } = generalSlice.actions;
export default generalSlice.reducer

