import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allRejectedAnnouncements: [],
    createdRejectedData: {},
    updatedRejectedData: {},
    deletedRejectedData: {},
    isLoading: false
};

//GET ALL ANNOUNCEMENT
export const getAllRejectedAnnouncementsFunc = createAsyncThunk(
    'api/getAllRejectedAnnouncements',
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rej-allannouncements`, {
                method: 'GET'
            });
            return await response.json()
        } catch (error) {
            console.log(error);
        }

    }
)

//GET ALL ANNOUNCEMENT by ID
export const getAllRejectedAnnouncementsByIdOwnerFunc = createAsyncThunk(
    'api/getAllRejectedAnnouncementsByIdOwner',
    async (input) => {
        const {idOwner, token} = input;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rej-announcement/${idOwner}`, {
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
export const createRejectedAnnouncementFunc = createAsyncThunk(
    'api/createRejectedAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rej-createannouncement`, {
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
export const updateRejectedAnnouncementFunc = createAsyncThunk(
    'api/updateRejectedAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/updaterej-announcement`, {
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

export const deleteRejectedAnnouncementFunc = createAsyncThunk(
    'api/deleteRejectedAnnouncement',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rej-deleteannouncement/${input}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
)

const rejectedSlice = createSlice({
    name: "apiRejected",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // getAllRejectedAnnouncements
        builder.addCase(getAllRejectedAnnouncementsFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllRejectedAnnouncementsFunc.fulfilled, (state, action) => {
            state.allRejectedAnnouncements = action.payload
            state.isLoading = false

        });
        builder.addCase(getAllRejectedAnnouncementsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // getAllRejectedAnnouncementsByIdOwner
        builder.addCase(getAllRejectedAnnouncementsByIdOwnerFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllRejectedAnnouncementsByIdOwnerFunc.fulfilled, (state, action) => {
            state.allRejectedAnnouncements = action.payload.payload
            state.isLoading = false

        });
        builder.addCase(getAllRejectedAnnouncementsByIdOwnerFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // createRejectedAnnouncement
        builder.addCase(createRejectedAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createRejectedAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.createdRejectedData = action.payload
        });
        builder.addCase(createRejectedAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
        // updateRejectedAnnouncement
        builder.addCase(updateRejectedAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateRejectedAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updatedRejectedData = action.payload
        });
        builder.addCase(updateRejectedAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
        // deleteRejectedAnnouncement
        builder.addCase(deleteRejectedAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteRejectedAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteRejectedAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
})

export default rejectedSlice.reducer