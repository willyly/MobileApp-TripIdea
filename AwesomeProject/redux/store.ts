import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import userReducer from "./user/userSlice"
import travelPlanReducer from "./travelPlan/travelPlanSlice"

export const store = configureStore({
    reducer: {
        // object key 必須與 slice 名一樣
        user: userReducer,
        travelPlan: travelPlanReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

// RootState 係所有分支 State 集合體
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
