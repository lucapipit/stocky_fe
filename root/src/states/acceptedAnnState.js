import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allAcceptedAnnouncements: [],
    isLoading: false
};


//GET ALL ANNOUNCEMENT by ID
export const getAllAcceptedAnnouncementsByIdOwnerFunc = createAsyncThunk(
    'api/getAllAcceptedAnnouncementsByIdOwner',
    async (input) => {
        const {idOwner, token} = input;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/allannouncements/${idOwner}`, {
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

const acceptedSlice = createSlice({
    name: "apiAccepted",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // getAllPendingAnnouncementsByIdOwner
        builder.addCase(getAllAcceptedAnnouncementsByIdOwnerFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllAcceptedAnnouncementsByIdOwnerFunc.fulfilled, (state, action) => {
            state.allAcceptedAnnouncements = action.payload.payload
            state.isLoading = false
        });
        builder.addCase(getAllAcceptedAnnouncementsByIdOwnerFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
    }
})

export default acceptedSlice.reducer