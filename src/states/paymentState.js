import{createSlice,createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    paymentData: [],
    loading: false,
    error: ""
};

export const PaymentFunc = createAsyncThunk(
    'api/postPaymentFunc',
    async (input) => {
        try {
            const response = await fetch(`http://localhost:5050/payment`, {
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
