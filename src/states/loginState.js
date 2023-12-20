import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isLogged: false,
    loading: false,
    error: false
};

export const postLoginFunc = createAsyncThunk(
    'api/postLogin',
    async (input) => {
        const response = await fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
    }
);

const loginSlice = createSlice({
    name: 'loginApi',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLoginFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postLoginFunc.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(postLoginFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { setIsLogged } = loginSlice.actions;
export default loginSlice.reducer

