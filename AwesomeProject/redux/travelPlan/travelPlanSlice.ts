import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetTravelPlan, TravelPlan } from './helper/TravelPlanResponse'
import { findPlansCreatedByUserThunk } from './thunk/findPlansCreatedByUserThunk'

// User Global State 定義
export interface TravelPlanState {
    userSelfCreatedPlans: Array<TravelPlan>
}

// User Global State 開app起始狀態
export const initialState: TravelPlanState = {
    userSelfCreatedPlans: [],
}

// User Global State 分支
export const travelPlanSlice = createSlice({
    // 名要Unique
    name: "travelPlan",
    initialState,

    // non-async function
    reducers: {
    },

    // async function
    extraReducers: (builder) => {
        // loginThunk - 進行 Promise call 中
        builder.addCase(findPlansCreatedByUserThunk.pending, (state, action) => {
            // state.signingIn = "loading"
        });

        // loginThunk - return 失敗 (error)
        builder.addCase(findPlansCreatedByUserThunk.rejected, (state, action) => {
            // state.signingIn = "failed"
        });

        // loginThunk - 成功
        builder.addCase(findPlansCreatedByUserThunk.fulfilled, (state, action) => {
            state.userSelfCreatedPlans = action.payload;
        });
    }
})

//export userSlice 入面既 reducers 出黎用
export const { } = travelPlanSlice.actions;

export default travelPlanSlice.reducer;