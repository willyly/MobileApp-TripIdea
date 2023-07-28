import axios from 'axios';
// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

const getPlanDetail = async (PlanId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plan-days/${PlanId}`)

        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const getDayDetail = async (PlanId, whichDay) => {
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plan-details/getDayDetail/${PlanId}?whichDay=${whichDay}`)

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getLocationDetail = async (locationPlanId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plan-details/${locationPlanId}`)

        // const response = await fetch(`http://192.168.59.206:3000/travel-plan-details/getDayDetail/${PlanId}?whichDay=${whichDay}`)

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const create = async (DayPlanId, form) => {
    return await axios.post(`${BACKEND_URL}/travel-plan-details/${DayPlanId}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteDetail = async (locationPlanId) => {
    let access_token = await AsyncStorage.getItem('access_token');
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plan-details/${locationPlanId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        });

        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

const getLocationImg = (locationImg) => {
    return `${BACKEND_URL}/public/travelPlanDetail_locationImgs/locationImgFile-${locationImg[1]}-${locationImg[2]}`;
}

export default {
    create,
    deleteDetail,
    getPlanDetail,
    getDayDetail,
    getLocationDetail,
    getLocationImg
}