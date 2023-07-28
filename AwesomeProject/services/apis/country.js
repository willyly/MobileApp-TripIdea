import axios from 'axios';
// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;

const getAllCountry = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries`);

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getAllArea = async (countryId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries-areas/countryAreas/${countryId}`);

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getAllCity = async (areaId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries-cities/areaCities/${areaId}`);

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getOneCountry = async (countryId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries/${countryId}`);
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getOneArea = async (areaId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries-areas/${areaId}`);
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getOneCity = async (cityId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/countries-cities/${cityId}`);
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

export default {
    getAllCountry,
    getAllArea,
    getAllCity,
    getOneCountry,
    getOneArea,
    getOneCity,
}