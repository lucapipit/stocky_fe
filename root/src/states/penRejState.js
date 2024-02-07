import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allPendingAnnouncements: [],
    allRejectedAnnouncements: [],
    createdPendingData: {},
    updatedPendingData: {},
    deletedPendingData: {},
    createdRejectedData: {},
    updatedRejectedData: {},
    deletedRejectedData: {},
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

const penRejSlice = createSlice({
    name: "apiPenRej",
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

export default penRejSlice.reducer