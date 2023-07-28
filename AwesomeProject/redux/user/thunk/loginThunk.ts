import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

// 左邊 Type = Response, 右邊 Type = Request 同之前學既調轉
export const loginThunk = createAsyncThunk<any, { email: string, password: string }>(
    "user/login",

    // 左邊 Type = Request
    async (requestBody: { email: string, password: string }, thunkAPI) => {
        let result = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": requestBody.email,
                "password": requestBody.password,
            })
        })

        console.log('loginThunk result: ', result);

        // 如失敗, throw error (extraReducers rejected狀態)
        if (!result.ok) {
            return thunkAPI.rejectWithValue(result);
        }

        // log token 出黎睇
        let json = await result.json();
        // console.log('loginThunk before save token: ', json.access_token);

        await AsyncStorage.setItem("access_token", json.access_token);
        let savedToken = await AsyncStorage.getItem("access_token")
        console.log('loginThunk after save token: ', savedToken)

        // console.log('json.access_token:', json.access_token);

        return json;
    }
)