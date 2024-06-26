import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
};

export const postSigninFunc = createAsyncThunk(
    'api/postSigninFunc',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/signin`, {
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

export const verifyMailFunc = createAsyncThunk(
    'api/verifyMailFunc',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/mailer/verifyaccount`, {
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
)

export const psswChangedMailFunc = createAsyncThunk(
    'api/psswChangedMailFunc',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/mailer/passwordchanged`, {
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
)

export const resetPsswMailFunc = createAsyncThunk(
    'api/resetPsswMailFunc',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/mailer/resetpssw`, {
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
)

export const activateAccountFunc = createAsyncThunk(
    'api/activateAccountFunc',
    async (input) => {
        const { token, payload } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/editaccount`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }
)

export const updateAccountFunc = createAsyncThunk(
    'api/updateAccountFunc',
    async (input) => {
        const { token, payload } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/editaccount`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }
)

export const changePsswFunc = createAsyncThunk(
    'api/changePsswFunc',
    async (input) => {
        const { token, payload } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/changemypssw`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }
)

const signinSlice = createSlice({
    name: 'signinApi',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //post Signin
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
        //verify email
        builder.addCase(verifyMailFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyMailFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(verifyMailFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        //password changed email
        builder.addCase(psswChangedMailFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(psswChangedMailFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(psswChangedMailFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        //reset password email
        builder.addCase(resetPsswMailFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPsswMailFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(resetPsswMailFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        //activate account
        builder.addCase(activateAccountFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(activateAccountFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(activateAccountFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        //update account
        builder.addCase(updateAccountFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAccountFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateAccountFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        //change password
        builder.addCase(changePsswFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePsswFunc.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(changePsswFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

const { } = signinSlice.actions;
export default signinSlice.reducer

