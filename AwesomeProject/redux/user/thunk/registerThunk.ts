import { createAsyncThunk } from '@reduxjs/toolkit'

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

// 左邊 Type = Response, 右邊 Type = Request 同之前學既調轉
export const registerThunk = createAsyncThunk<any, { email: string, password: string, nickname: string, selfIntroduction: string, gender: string, phone: string, icon: string }>(
    "user/register",

    // 左邊 Type = Request
    async (requestBody: { email: string, password: string, nickname: string, selfIntroduction: string, gender: string, phone: string, icon: string }, thunkAPI) => {
        let result = await fetch(`${BACKEND_URL}/users/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": requestBody.email,
                "password": requestBody.password,
                "nickname": requestBody.nickname,
                "gender": requestBody.gender,
                "phone": requestBody.phone,
                "icon": requestBody.icon,
                "selfIntroduction": requestBody.selfIntroduction
            })
        });

        // console.log('registerThunk result: ', result);

        // 如失敗, throw error (即extraReducers rejected狀態)
        if (!result.ok) {
            return thunkAPI.rejectWithValue(result);
        }

        // let json = await result.json();

        // 如成功, return 完整 object 給 extraReducers 儲存 Global State (fulfilled狀態)
        return result;

    }
)