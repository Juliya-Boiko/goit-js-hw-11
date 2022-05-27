import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '27622975-8053d8179d4dd5adbee6b248d';
const BASE_URL = 'https://pixabay.com/api/';

export const imgParams = {
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page: 1
}

const customAxios = axios.create({
    baseURL: `${BASE_URL}?key=${API_KEY}`
});

export const getImages = async (params) => {
    try {
        const result = await customAxios.get('', { params });
        return result;
    } catch {
        Notify.failure('Sorry, its data error');
    }
}