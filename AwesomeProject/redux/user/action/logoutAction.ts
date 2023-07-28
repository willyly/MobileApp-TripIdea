import { UserState } from "../userSlice";
import { CaseReducer } from "@reduxjs/toolkit"


export const logoutAction: CaseReducer<UserState> = (state) => {
    state.isLoggedIn = false;
    state.signingIn = "none";
    state.access_token = undefined;
    state.getUsersResult = undefined;
    state.getSelfUserResult = undefined;
    state.getUserResult = undefined;
    state.targetUserId = undefined;
}