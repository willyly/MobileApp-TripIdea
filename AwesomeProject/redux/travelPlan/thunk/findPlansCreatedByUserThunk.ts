import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TravelPlan } from '../helper/TravelPlanResponse';
import serviceApi from '../../../services/apis/travelPlans';

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

// 左邊 Type = Response, 右邊 Type = Request 同之前學既調轉
export const findPlansCreatedByUserThunk = createAsyncThunk<Array<TravelPlan>, void>(
    "travelPlan/findPlansCreatedByUser",

    // 左邊 Type = Request
    async (requestBody, thunkAPI) => {

        // 用asyncStorage 就可以吾洗出面食入黎
        let access_token = await AsyncStorage.getItem('access_token');
        // console.log('access_token: ', access_token);

        let result = await fetch(`${BACKEND_URL}/travel-plans/selfCreatedPlan`, {

            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        // console.log('findPlansCreatedByUser result: ', result);

        // 如失敗, throw error (extraReducers rejected狀態)
        if (!result.ok) {
            return thunkAPI.rejectWithValue(result);
        }

        // log token 出黎睇
        let json: Array<TravelPlan> = await result.json();
        // console.log('findPlansCreatedByUser json: ', json);

        // from public\travelPlan_thumbnalis\thumbnailFile-1679817189666-608433318.jpeg
        // to http://localhost:3000/public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg
        for (let plan of json) {
            let thumbnailUri: string = serviceApi.getPlanThumbnail(plan.thumbnail.split('-'));
            plan.thumbnail = thumbnailUri;
        }

        // 如成功, return 完整 object 給 extraReducers 儲存 Global State (fulfilled狀態)
        return json;
    }
)