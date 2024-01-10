import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    allData: [],
    singleData: [],
    isLoading: false,
    allCounts: 1,
    error: ""
}

export const getAllCountsFunc = createAsyncThunk(
    'api/getAllCounts',
    async()=>{
        try {
            const response = await fetch(`${process.env.BACKEND_ADDRESS}/allcounts`, {
                method: 'GET'
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllAnnouncementsFunc = createAsyncThunk(
    'api/getAllAnnouncements',
    async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_ADDRESS}/allannouncements`, {
                method: 'GET'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }
)

export const postCreateAnnouncementFunc = createAsyncThunk(
    'api/postCreateAnnouncement',
    async (input) => {

        try {
            const response = await fetch(`${process.env.BACKEND_ADDRESS}/createannouncement`, {
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
)

export const deleteAnnouncementFunc = createAsyncThunk(
    'api/deleteAnnouncement',
    async (id) => {
        const response = await fetch(`${process.env.BACKEND_ADDRESS}/deleteannouncement/${id}`, {
            method: 'delete',
        });
        const data = await response.json();
        return data
    }
)

export const updateAnnouncementFunc = createAsyncThunk(
    'api/updateAnnouncement',
    async (input, id) => {
        const response = await fetch(`${process.env.BACKEND_ADDRESS}/updateannouncement/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)

        });
        const data = await response.json();
        return data
    }
)

export const getSingleAnnouncementFunc = createAsyncThunk(
    'api/getSingleAnnouncement',
    async (input) => {
        const  {id, token} = input;
        const response = await fetch(`${process.env.BACKEND_ADDRESS}/announcement/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data
    }
)

const sliceStore = createSlice({
    name: 'api',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        //getAllCounts
        builder.addCase(getAllCountsFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllCountsFunc.fulfilled, (state, action) => {
            state.allCounts = action.payload
            state.isLoading = false
        })
        builder.addCase(getAllCountsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        //postCreateAnnouncements
        builder.addCase(postCreateAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(postCreateAnnouncementFunc.fulfilled, (state, action) => {
            state.allData = action.payload
            state.isLoading = false
        })
        builder.addCase(postCreateAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // getAllAnnouncements
        builder.addCase(getAllAnnouncementsFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllAnnouncementsFunc.fulfilled, (state, action) => {
            state.allData = action.payload
            state.isLoading = false

        })
        builder.addCase(getAllAnnouncementsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        }
        );
        //deleteAnnouncement
        builder.addCase(deleteAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteAnnouncementFunc.fulfilled, (state, action) => {
            state.allData = action.payload
            state.isLoading = false

        })
        builder.addCase(deleteAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // updateAnnouncement
        builder.addCase(updateAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allData = action.payload
        });
        builder.addCase(updateAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })

        //singleAnnouncement
        builder.addCase(getSingleAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getSingleAnnouncementFunc.fulfilled, (state, action) => {
            state.singleData = action.payload
            state.isLoading = false
        })
        builder.addCase(getSingleAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
});

export default sliceStore.reducer
