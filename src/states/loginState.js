import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isLogged: false,
    loading: false,
    error: "",
    userData: [],
    loadingUser: false
};

export const postLoginFunc = createAsyncThunk(
    'api/postLogin',
    async (input) => {

        try {
            const response = await fetch(`http://localhost:5050/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }

    }
);

export const getSingleUserFunc = createAsyncThunk(
    'api/getSingleUser',
    async (input) => {
        const {id, token} = input;
        try {
            const response = await fetch(`http://localhost:5050/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }

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
        //login
        builder.addCase(postLoginFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postLoginFunc.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(postLoginFunc.rejected, (state) => {
            state.loading = false;
            state.error = "server error extrareducers";
        });
        //get single user
        builder.addCase(getSingleUserFunc.pending, (state) => {
            state.loadingUser = true;
        });
        builder.addCase(getSingleUserFunc.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.userData = action.payload
        });
        builder.addCase(getSingleUserFunc.rejected, (state) => {
            state.loadingUser = false;
            state.error = "server error extrareducers";
        });
    }
});

export const { setIsLogged } = loginSlice.actions;
export default loginSlice.reducer

