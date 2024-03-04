import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allPendingAnnouncements: [],
    createdPendingData: {},
    updatedPendingData: {},
    deletedPendingData: {},
    isLoading: false
};

//GET ALL ANNOUNCEMENT
export const getAllPendingAnnouncementsFunc = createAsyncThunk(
    'api/getAllPendingAnnouncements',
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/pen-allannouncements`, {
                method: 'GET'
            });
            return await response.json()
        } catch (error) {
            console.log(error);
        }

    }
)

//GET ALL ANNOUNCEMENT by ID
export const getAllPendingAnnouncementsByIdOwnerFunc = createAsyncThunk(
    'api/getAllPendingAnnouncementsByIdOwner',
    async (input) => {
        const {idOwner, token} = input;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/pen-announcement/${idOwner}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json()
        } catch (error) {
            console.log(error);
        }

    }
)

//CREATE ANNOUNCEMENT
export const createPendingAnnouncementFunc = createAsyncThunk(
    'api/createPendingAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/pen-createannouncement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            });
            return await response.json()
        } catch (error) {
            console.log(error);
        }

    }
)

//UPDATE ANNOUNCEMENT
export const updatePendingAnnouncementFunc = createAsyncThunk(
    'api/updatePendingAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/updatepen-announcement`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
)

//DELETE ANNOUNCEMENT
export const deletePendingAnnouncementFunc = createAsyncThunk(
    'api/deletePendingAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/pen-deleteannouncement/${input}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
)

const pendingSlice = createSlice({
    name: "apiPending",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // getAllPendingAnnouncements
        builder.addCase(getAllPendingAnnouncementsFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPendingAnnouncementsFunc.fulfilled, (state, action) => {
            state.allPendingAnnouncements = action.payload
            state.isLoading = false

        });
        builder.addCase(getAllPendingAnnouncementsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // getAllPendingAnnouncementsByIdOwner
        builder.addCase(getAllPendingAnnouncementsByIdOwnerFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPendingAnnouncementsByIdOwnerFunc.fulfilled, (state, action) => {
            state.allPendingAnnouncements = action.payload.payload
            state.isLoading = false

        });
        builder.addCase(getAllPendingAnnouncementsByIdOwnerFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // createPendingAnnouncement
        builder.addCase(createPendingAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createPendingAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.createdPendingData = action.payload
        });
        builder.addCase(createPendingAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
        // updatePendingAnnouncement
        builder.addCase(updatePendingAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updatePendingAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updatedPendingData = action.payload
        });
        builder.addCase(updatePendingAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
        // deletedPendingAnnouncement
        builder.addCase(deletePendingAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePendingAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deletedPendingData = action.payload
        });
        builder.addCase(deletePendingAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
})

export default pendingSlice.reducer