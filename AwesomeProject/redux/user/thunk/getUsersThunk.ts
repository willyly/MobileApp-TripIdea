import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

// 左邊 Type = Response, 右邊 Type = Request 同之前學既調轉
export const getUsersThunk = createAsyncThunk<any, string>(
    "user/getUsers",

    // 左邊 Type = Request
    async (requestBody: string, thunkAPI) => {

        // 用asyncStorage 就可以吾洗出面食入黎 
        // let access_token = await asyncStorage.getItem('access_token');
        let access_token = requestBody;

        let result = await fetch(`${BACKEND_URL}/users`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        // console.log('getUsersThunk result: ', result);

        // 如失敗, throw error (extraReducers rejected狀態)
        if (!result.ok) {
            return thunkAPI.rejectWithValue(result);
        }

        // log token 出黎睇
        let json = await result.json();
        // console.log('getUsersThunk json: ', json);

        // 如成功, return 完整 object 給 extraReducers 儲存 Global State (fulfilled狀態)
        return json;
    }
)