import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    finalScore: []
}

const annScoreSlice = createSlice({
    name: "annScoreSlice",
    initialState,
    reducers: {
        generateScore: (state, action) => {

            let score = 0;
            const idAnn = action.payload.id;
            if (action.payload.brandName) { score += 6 };
            if (action.payload.modelName) { score += 6 };
            if (action.payload.manufacturerName) { score += 5 };
            if (action.payload.category) { score += 6 };
            if (action.payload.price) { score += 8 };
            if (action.payload.quantity) { score += 8 };

            if (action.payload.productSize.length > 4) { score += 4 };

            if (action.payload.description.length <= 100) { score += 2 };
            if (action.payload.description.length > 100 && action.payload.description.length <= 600) { score += 6 };
            if (action.payload.description.length > 600) { score += 12 };

            if (action.payload.techDetail.split(",").length > 1 && action.payload.techDetail.split(",").length <= 3) { score += 3 };
            if (action.payload.techDetail.split(",").length > 3) { score += 10 };

            if (action.payload.pics.split(",").length <= 3) { score += 6 };
            if (action.payload.pics.split(",").length > 3) { score += 10 };

            if (action.payload.idPackage === 1) { score += 2 };
            if (action.payload.idPackage === 2) { score += 7 };
            if (action.payload.idPackage === 3) { score += 10 };

            state.finalScore = [...state.finalScore, { id: idAnn, score: score }]

        },

        clearScore: (state, action) => {
            state.finalScore = []
        }
    }
})

export const { generateScore, clearScore } = annScoreSlice.actions;
export default annScoreSlice.reducer