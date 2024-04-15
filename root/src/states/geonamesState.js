import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    allCities: [],
    isLoading: false,
    allCitiesFiltered: []
}

export const getCitiesFunc = createAsyncThunk(
    'api/getCities',
    async (input) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/geonames/${input}`, {
                method: 'GET'
            });
            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }
)

const geonamesSlice = createSlice({
    name: 'geonameStore',
    initialState,
    reducers: {
        searchCity: (state, action) => {
            state.allCitiesFiltered = state.allCities.filter((el)=>el.name.toLowerCase().includes(action.payload.toLowerCase()));
        },
        clearSearchCity: (state, action) =>{
            state.allCitiesFiltered = []
        }
    },

    extraReducers: (builder) => {
        //detCities
        builder.addCase(getCitiesFunc.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCitiesFunc.fulfilled, (state, action) => {
            state.allCities = action.payload.payload
            state.isLoading = false
        })
        builder.addCase(getCitiesFunc.rejected, (state) => {
            state.isLoading = false;
            state.error = " server error"
        });
    }
});

export const {searchCity, clearSearchCity} = geonamesSlice.actions;
export default geonamesSlice.reducer
