import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    outletData: [],
    error: ""
}

export const getUserOutletFunc = createAsyncThunk(
    "getUserOutletFunc",
    async (input) => {
        const {idOwner, token} = input;
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/getuseroutlet/${idOwner}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json()

    }
)

export const createUserOutletFunc = createAsyncThunk(
    "createUserOutletFunc",
    async (input) => {
        const {payload, token} = input;
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/createuseroutlet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        return await response.json()

    }
)

const outletSlice = createSlice({
    name: "outletSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getUserOutletFunc
        builder.addCase(getUserOutletFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getUserOutletFunc.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(getUserOutletFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        //createUserOutletFunc
        builder.addCase(createUserOutletFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createUserOutletFunc.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(createUserOutletFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
})

export default outletSlice.reducer
