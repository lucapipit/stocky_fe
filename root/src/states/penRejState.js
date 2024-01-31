import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allPendingAnnouncements: [],
    allRejectedState: [],
    updatedData: {},
    isLoading: false
};

export const getAllPendingAnnouncementsFunc = createAsyncThunk(
    'api/getAllPendingAnnouncements',
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/pen-allannouncements`, {
                method: 'GET'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }
)

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


const penRejSlice = createSlice({
    name: "apiPenRej",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // getAllAnnouncements
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
        // updateAnnouncement
        builder.addCase(updatePendingAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updatePendingAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updatedData = action.payload
        });
        builder.addCase(updatePendingAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
})

export default penRejSlice.reducer