import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    isHamMenuOpen: false,
    isPenRejModalEditing: { value: false, id: null },
    dcdTkn: { id: "", email: "", interests: "" },
    categoriesProduct: [],
    categoriesProductId: [],
    distributionAreaISO: []
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
            let isDuplicated = false;
            state.categoriesProduct && state.categoriesProduct.map((el) => {
                if (el.id === action.payload.id) { isDuplicated = true }
            });

            if (!isDuplicated || state.categoriesProduct.length === 0) {
                state.categoriesProduct.push(action.payload);
                state.categoriesProductId.push(action.payload.id)
            }

        },
        delCategoriesProduct: (state, action) => {
            const cat = [];
            const catId = [];
            state.categoriesProduct.map((el) => {
                if (el.id !== action.payload) {
                    cat.push(el);
                    catId.push(el.id)
                }
            });
            state.categoriesProduct = cat;
            state.categoriesProductId = catId
        },
        clearCategoriesProduct: (state, action) => {
            state.categoriesProduct = [];
            state.categoriesProduct.id = []
        },
        setDistributionArea: (state, action) => {
            let isDuplicated = false;
            state.distributionAreaISO && state.distributionAreaISO.map((el) => {
                if (el === action.payload) { isDuplicated = true }
            });
            if (!isDuplicated) { state.distributionAreaISO.push(action.payload); }

        },
        delDistributionArea: (state, action) => {
            const arryCountries = [];
            state.distributionAreaISO && state.distributionAreaISO.map((el) => {
                if (action.payload !== el) {
                    arryCountries.push(el)
                }
            });
            state.distributionAreaISO = arryCountries
        }
    }
});

export const { setIsHamMenuOpen, setIsPenRejModalEditing, decodeTkn, setCategoriesProduct, delCategoriesProduct, clearCategoriesProduct,
    setDistributionArea, delDistributionArea } = generalSlice.actions;
export default generalSlice.reducer

