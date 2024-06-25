import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    singleChat: [],
    error: "",
    myChatState: false
}

export const getSingleChatFunc = createAsyncThunk(
    "getSingleChatFunc",
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/getsinglechat/${input}`, {
                method: "GET"
            });
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
);

export const createChatFunc = createAsyncThunk(
    "createChatFunc",
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/createchat`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'/* ,
                    'Authorization': `Bearer ${token}` */
                },
                body: JSON.stringify(input)
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
);

export const updateChatFunc = createAsyncThunk(
    "updateChatFunc",
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/updatechat`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'/* ,
                    'Authorization': `Bearer ${token}` */
                },
                body: JSON.stringify(input)
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
);

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        goToMyChat: (state, action) => {
            state.myChatState = {typeSubMenu: action.payload.typeSubMenu}
        }
    },
    extraReducers: (builder) => {
        //getSingleChatFunc
        builder.addCase(getSingleChatFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getSingleChatFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singleChat = action.payload.data
        });
        builder.addCase(getSingleChatFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = "server error"
        });
        //createChatFunc
        builder.addCase(createChatFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createChatFunc.fulfilled, (state) => {
            state.isLoading = false
        });
        builder.addCase(createChatFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = "server error"
        });
        //updateChatFunc
        builder.addCase(updateChatFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(updateChatFunc.fulfilled, (state) => {
            state.isLoading = false
        });
        builder.addCase(updateChatFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = "server error"
        });

    }

})

export const { goToMyChat } = chatSlice.actions;
export default chatSlice.reducer