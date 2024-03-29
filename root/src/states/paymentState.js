import{createSlice,createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    paymentData: [],
    loading: false,
    error: ""
};

export const PaymentFunc = createAsyncThunk(
    'api/postPaymentFunc',
    async (input) => {
        const {tkn, apiKey} = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}` 
                },
                body: JSON.stringify(tkn),
            });
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.log(error);
        }

    }
);

const paymentSlice = createSlice({
    name: 'paymentApi',
    initialState,
    reducers: {
        setPaymentData: (state, action) => {
            state.paymentData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PaymentFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(PaymentFunc.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentData = action.payload
        });
        builder.addCase(PaymentFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { setPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer
