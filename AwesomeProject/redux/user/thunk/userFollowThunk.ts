import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserFollowResponse } from '../helper/userResponse';

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

// 左邊 Type = Response, 右邊 Type = Request 同之前學既調轉
export const userFollowThunk = createAsyncThunk<UserFollowResponse, any>(
    "user/userFollow",

    // 左邊 Type = Request
    async (requestBody: number, thunkAPI) => {

        let access_token = await AsyncStorage.getItem('access_token');

        let result = await fetch(`${BACKEND_URL}/user-follows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({
                "followingId": requestBody
            })
        });

        // console.log('userFollowThunk result: ', result);

        // 如失敗, throw error (即extraReducers rejected狀態)
        if (!result.ok) {
            return thunkAPI.rejectWithValue(result);
        }

        let json: UserFollowResponse = await result.json();

        console.log('userFollowThunk json: ', json);

        // 如成功, return 完整 object 給 extraReducers 儲存 Global State (fulfilled狀態)
        return json;

    }
)