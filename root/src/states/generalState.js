import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    isHamMenuOpen: false,
    isPenRejModalEditing: { value: false, id: null },
    dcdTkn: { id: "", email: "", interests: "" },
    categoriesProduct: [],
    categoriesProductEng: []
};


const generalSlice = createSlice({
    name: 'generalStates',
    initialState,
    reducers: {
        setIsHamMenuOpen: (state, action) => {
            state.isHamMenuOpen = action.payload
        },
        setIsPenRejModalEditing: (state, action) => {
            state.isPenRejModalEditing = action.payload
        },
        decodeTkn: (state, action) => {
            const token = localStorage.getItem("token");
            if (token) {
                const tkn = jwtDecode(token, process.env.JWT_SECRET);
                state.dcdTkn = tkn;
            }
        },
        setCategoriesProduct: (state, action) => {
            const cat = state.categoriesProduct;
            const catEng = state.categoriesProductEng;
            cat.push({ id: action.payload.id, eng: action.payload.eng, ita: action.payload.ita, area: action.payload.area });
            console.log(catEng);
            catEng.push(action.payload.eng);
            state.categoriesProduct = cat

        },
        delCategoriesProduct: (state, action) => {
            const cat = [];
            state.categoriesProduct.map((el) => {
                if (el.id !== action.payload) {
                    cat.push(el)
                }
            });
            state.categoriesProduct = cat
        },
    }
});

export const { setIsHamMenuOpen, setIsPenRejModalEditing, decodeTkn, setCategoriesProduct, delCategoriesProduct } = generalSlice.actions;
export default generalSlice.reducer

