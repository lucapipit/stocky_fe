import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    singleChat: [],
    error: "",
    myChatState: false,
    usersById: [],
    allChatsNotify: [],
    notifyStatus: false,
    notifyCount: 0
}

export const getSingleChatFunc = createAsyncThunk(
    "getSingleChatFunc",
    async (input) => {
        const { room, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/getsinglechat/${room}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
);

export const getAllChatsNotifyByIdOwnerUserFunc = createAsyncThunk(
    "getAllChatsNotifyByIdOwnerUserFunc",
    async (input) => {
        const { idOwnerUser, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/getallchatsnotifybyidowneruser/${idOwnerUser}`, {

                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
        const { payload, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/createchat`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
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
        const { payload, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/updatechat`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
);

export const allUsersByIdSetFunc = createAsyncThunk(
    "allUsersByIdSetFunc",
    async (input) => {
        const { idSet, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/allusersbyidset/${idSet}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }
)

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        goToMyChat: (state, action) => {
            state.myChatState = action.payload
        },
        areThereNotify: (state, action) => {
            const {chats, idOwner} = action.payload;
            state.notifyCount = 0;
            chats && chats.map((el) => {
                if (el.idOwner == idOwner) {
                    
                    if (!el.ownerCheck) {
                        state.notifyStatus = true;
                        state.notifyCount = state.notifyCount + 1
                    }
                } else {
                    if (!el.userCheck) {
                        state.notifyStatus = true;
                        state.notifyCount = state.notifyCount + 1
                    }
                }
            });
        },
        updateNotifyStatus: (state, action) => {
            console.log("funziono");
            state.notifyStatus = action.payload
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
        //getAllChatsNotifyByIdOwnerUserFunc
        builder.addCase(getAllChatsNotifyByIdOwnerUserFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllChatsNotifyByIdOwnerUserFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allChatsNotify = action.payload.data
        });
        builder.addCase(getAllChatsNotifyByIdOwnerUserFunc.rejected, (state) => {
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
        //allUsersByIdSetFunc
        builder.addCase(allUsersByIdSetFunc.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(allUsersByIdSetFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersById = action.payload.data
        });
        builder.addCase(allUsersByIdSetFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = "server error"
        });

    }

})

export const { goToMyChat, updateNotifyStatus, areThereNotify } = chatSlice.actions;
export default chatSlice.reducer