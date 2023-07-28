import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

const getHitPlans = async (PlanName) => {
    let access_token = await AsyncStorage.getItem('access_token');
    try {
        const response = PlanName ?
            await fetch(`${BACKEND_URL}/travel-plans/hitPlan?name=${PlanName}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }) :
            await fetch(`${BACKEND_URL}/travel-plans/hitPlan`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const getSharedPlans = async (userId, PlanName) => {
    let access_token = await AsyncStorage.getItem('access_token')
    try {
        const response = PlanName ?
            await fetch(`${BACKEND_URL}/travel-plan-share/sharePlan/${userId}?name=${PlanName}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }) :
            await fetch(`${BACKEND_URL}/travel-plan-share/sharePlan/${userId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const getMyPlans = async (userId, PlanName) => {
    let access_token = await AsyncStorage.getItem('access_token');
    try {
        const response = PlanName ?
            await fetch(`${BACKEND_URL}/travel-plans/myselfPlan/${userId}?name=${PlanName}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }) :
            await fetch(`${BACKEND_URL}/travel-plans/myselfPlan/${userId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const getOnePlans = async (PlanId) => {
    let access_token = await AsyncStorage.getItem('access_token');
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plans/${PlanId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

const create = async (form) => {
    let access_token = await AsyncStorage.getItem('access_token');

    let postPlan = await axios.post(`${BACKEND_URL}/travel-plans`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${access_token}`
        },
    })
    return postPlan.data;
};

const updatePlan = async (planId, form) => {
    let access_token = await AsyncStorage.getItem('access_token');
    return await axios.patch(`${BACKEND_URL}/travel-plans/${planId}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${access_token}`,
        },
    });
};

const deletePlan = async (PlanId) => {
    let access_token = await AsyncStorage.getItem('access_token');
    try {
        const response = await fetch(`${BACKEND_URL}/travel-plans/${PlanId}`, {
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

const getPlanThumbnail = (thumbnailImg) => {
    return `${BACKEND_URL}/public/travelPlan_thumbnalis/thumbnailFile-${thumbnailImg[1]}-${thumbnailImg[2]}`;
}

export default {
    create,
    getMyPlans,
    getHitPlans,
    getSharedPlans,
    getOnePlans,
    deletePlan,
    updatePlan,
    getPlanThumbnail,
};