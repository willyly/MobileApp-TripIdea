import { UserState } from "../userSlice";
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"


export const setTargetUserAction: CaseReducer<UserState, PayloadAction<number>> = (state, action) => {
    state.targetUserId = action.payload;
}