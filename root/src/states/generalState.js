import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    isHamMenuOpen: false,
    isPenRejModalEditing: { value: false, id: null },
    dcdTkn: {id: "", email: "", interests: ""}
};


const generalSlice = createSlice({
    name: 'generalStates',
    initialState,
    reducers: {
        setIsHamMenuOpen: (state, action) => {
            state.isHamMenuOpen = action.payload
        },
        setIsPenRejModalEditing: (state, action) => {
            state.isPenRejModalEditing = action.payload
        },
        decodeTkn: (state, action) => {
            const token = localStorage.getItem("token");
            if (token) {
                const tkn = jwtDecode(token, process.env.JWT_SECRET);
                state.dcdTkn = tkn;
            }
        }
    }
});

export const { setIsHamMenuOpen, setIsPenRejModalEditing, decodeTkn } = generalSlice.actions;
export default generalSlice.reducer

