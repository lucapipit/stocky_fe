import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {

    isDeletingPics: false


};


export const deleteFileFunc = createAsyncThunk( 
    'api/deleteFileFunc',
    async (input) => {
    try {
        const response = await fetch(`http://localhost:5050/del-fileupload/${input}`, {
            method: "DELETE"
        })
        return await response.json()
    } catch (error) {
        console.log(error);
    }

})



const uploadFileSlice = createSlice({
    name: 'uploadFileApi',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        //deleteFileFunc
        builder.addCase(deleteFileFunc.pending, (state) => {
            state.isDeletingPics = true
        });
        builder.addCase(deleteFileFunc.fulfilled, (state) => {
            state.isDeletingPics = false
        });
        builder.addCase(deleteFileFunc.rejected, (state) => {
            state.isDeletingPics = false
        });
    }
});

export const { setNewFileS } = uploadFileSlice.actions;
export default uploadFileSlice.reducer
