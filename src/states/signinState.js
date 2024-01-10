import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
};

export const postSigninFunc = createAsyncThunk(
    'api/postSigninFunc',
    async (input) => {
        try {
            const response = await fetch(`http://localhost:5050/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            });
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.log(error);
        }

    }
);

const signinSlice = createSlice({
    name: 'signinApi',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postSigninFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postSigninFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(postSigninFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

const { } = signinSlice.actions;
export default signinSlice.reducer

