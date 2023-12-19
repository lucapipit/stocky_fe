import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    Data: [],
    token: localStorage.getItem('token') || null,
    announcements: [],
    search:'',
    loading: false,
    error: false,

};

export const PostLogin = createAsyncThunk(
    'api/PostLogin',
    async (login) => {
        const response = await fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(login),
        });
        const data = await response.json();
        return data;
    }
);

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.Data = state.Data.filter((data) => data.name.toLowerCase().includes(state.search.toLowerCase()));
        },

    },
    extraReducers: (builder) => {
        builder.addCase(PostLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(PostLogin.fulfilled, (state, action) => {
            if (action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);

            }
            state.loading = false;

        });
        builder.addCase(PostLogin.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

    },
});

export default apiSlice.reducer;

