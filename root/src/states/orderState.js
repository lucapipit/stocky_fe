import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {

        orderItems: [],
        quantity: 0,
        itemsPrice: 0,
        totalPrice: 0,
    
};

export const orderFunc = createAsyncThunk(
    'api/postOrderFunc',
    async (input) => {
        const {orderItems, quantity, itemsPrice, totalPrice} = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(orderItems, quantity, itemsPrice, totalPrice),
            });
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.log(error);
        }

    }
);



const orderSlice = createSlice({
    name: 'orderApi',
    initialState,
    reducers: {
        setOrderItems: (state, action) => {
            state.orderItems = action.payload
        },
       
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setItemsPrice: (state, action) => {
            state.itemsPrice = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice += action.payload.itemsPrice*action.payload.quantity

        },
       
    },

    extraReducers: (builder) => {
        builder.addCase(orderFunc.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(orderFunc.fulfilled, (state, action) => {
            state.loading = false;
            state.orderItems = action.payload
        });
        builder.addCase(orderFunc.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { setOrderItems,  setQuantity, setItemsPrice, setTotalPrice } = orderSlice.actions;
export default orderSlice.reducer
