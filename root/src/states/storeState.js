import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    allData: [],
    singleData: [],
    dataByInterests: [],
    announcementPayload: {},
    isLoading: false,
    allCounts: 1,
    countByInterest: 0,
    error: ""
}

export const getAllCountsFunc = createAsyncThunk(
    'api/getAllCounts',
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/allcounts`, {
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
    async (input) => {
        const { token, status } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/allannouncements/${status}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }
)

export const getAllAnnouncementsByIdOwnerFunc = createAsyncThunk(
    'api/getAllAnnouncementsByIdOwner',
    async (input) => {
        const { idOwner, token } = input;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/alluserannouncements/${idOwner}`, {
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

export const postCreateAnnouncementFunc = createAsyncThunk(
    'api/postCreateAnnouncement',
    async (input) => {
        const { payload, token } = input;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/createannouncement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
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
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/deleteannouncement/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data
    }
)

export const updateAnnouncementFunc = createAsyncThunk(
    'api/updateAnnouncement',
    async (input) => {
        const { payload, token } = input;
        try {

            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/updateannouncement`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            return await response.json();

        } catch (error) {
            console.error(error)
        }
    }
)

export const getSingleAnnouncementFunc = createAsyncThunk(
    'api/getSingleAnnouncement',
    async (input) => {
        const { id, token } = input;
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/announcement/${id}`, {
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

export const getAnnouncementsByInterestsFunc = createAsyncThunk(
    'api/getAnnouncementsByInterests',
    async (input) => {
        const { interests, token } = input;
        const response = await fetch(`http://localhost:5050/announcementsbyinterests/${interests}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json()
    }
)


const sliceStore = createSlice({
    name: 'apiStore',
    initialState,
    reducers: {
        saveAnnouncementPayload: (state, action) => {
            state.announcementPayload = action.payload
        }
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
        // getAllAnnouncements
        builder.addCase(getAllAnnouncementsFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllAnnouncementsFunc.fulfilled, (state, action) => {
            state.allData = action.payload.data
            state.isLoading = false

        })
        builder.addCase(getAllAnnouncementsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        // getAllAnnouncementsByIdOwner
        builder.addCase(getAllAnnouncementsByIdOwnerFunc.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllAnnouncementsByIdOwnerFunc.fulfilled, (state, action) => {
            state.allData = action.payload.payload
            state.isLoading = false
        });
        builder.addCase(getAllAnnouncementsByIdOwnerFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        //postCreateAnnouncements
        builder.addCase(postCreateAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(postCreateAnnouncementFunc.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(postCreateAnnouncementFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
        //deleteAnnouncement
        builder.addCase(deleteAnnouncementFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteAnnouncementFunc.fulfilled, (state, action) => {
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
        //announcementsByInterests
        builder.addCase(getAnnouncementsByInterestsFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAnnouncementsByInterestsFunc.fulfilled, (state, action) => {
            state.dataByInterests = action.payload.data;
            state.countByInterest = action.payload.count;
            state.isLoading = false
        })
        builder.addCase(getAnnouncementsByInterestsFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        })
    }
});

export const { saveAnnouncementPayload } = sliceStore.actions;
export default sliceStore.reducer
