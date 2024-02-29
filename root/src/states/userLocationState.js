
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userLocationFunc = createAsyncThunk(
  'api/getUserLocation',
  async () => {
    try {
      const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    } catch (error) {
      return { error: error.message };
    }
  }
);

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState: {
    latitude: null,
    longitude: null,
    error: null
  },
  reducers: {
    setUserLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.error = null;
    },
    setUserLocationError(state, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLocationFunc.fulfilled, (state, action) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.error = null;
    });

    builder.addCase(userLocationFunc.pending, (state) => {
      state.error = null;
    });

    builder.addCase(userLocationFunc.rejected, (state, action) => {
      state.error = action.error.message;
    });
  }
});

export const { setUserLocation, setUserLocationError } = userLocationSlice.actions;

export default userLocationSlice.reducer;
