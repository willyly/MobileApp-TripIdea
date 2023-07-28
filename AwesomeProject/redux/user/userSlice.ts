import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from './thunk/loginThunk'
import { getUsersThunk } from './thunk/getUsersThunk'
import { logoutAction } from './action/logoutAction'
import { getSelfUserThunk } from './thunk/getSelfUserThunk'
// import { getUserThunk } from './thunk/getUserThunk'
import { UserResponse } from "./helper/userResponse"
import { getUserThunk } from './thunk/getUserThunk'
import { setTargetUserAction } from './action/setTargetUserAction'
import { userFollowThunk } from './thunk/userFollowThunk'
import { DeleteUserThunk } from './thunk/DeleteUserThunk'

// User Global State 定義
export interface UserState {
    isLoggedIn: boolean
    signingIn: "none" | "loading" | "failed" | "completed"
    access_token?: string
    getSelfUserResult?: UserResponse
    getUsersResult?: UserResponse
    getUserResult?: UserResponse
    targetUserId?: number
}

// User Global State 開app起始狀態
export const initialState: UserState = {
    isLoggedIn: false,
    signingIn: "none",
}

// User Global State 分支
export const userSlice = createSlice({
    // 名要Unique
    name: "user",
    initialState,

    // non-async function
    reducers: {
        logout: logoutAction,
        setTargetUser: setTargetUserAction
    },

    // async function
    extraReducers: (builder) => {
        // loginThunk - 進行 Promise call 中
        builder.addCase(loginThunk.pending, (state, action) => {
            state.signingIn = "loading"
        });

        // loginThunk - return 失敗 (error)
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.signingIn = "failed"
        });

        // loginThunk - 成功
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.signingIn = "completed"
            state.access_token = action.payload.access_token
        });

        // getUsersThunk - 成功
        builder.addCase(getUsersThunk.fulfilled, (state, action) => {
            state.getUsersResult = action.payload
        });

        // getSelfUserThunk - 成功
        builder.addCase(getSelfUserThunk.fulfilled, (state, action) => {
            state.getSelfUserResult = action.payload
        });

        // getUserThunk - 成功
        builder.addCase(getUserThunk.fulfilled, (state, action) => {
            state.getUserResult = action.payload
        });

        // userFollowThunk - 成功
        builder.addCase(userFollowThunk.fulfilled, (state, action) => {
            state.getSelfUserResult = action.payload.follower
            state.getUserResult = action.payload.following
        });
    }
})

//export userSlice 入面既 reducers 出黎用
export const { logout, setTargetUser } = userSlice.actions;

export default userSlice.reducer;