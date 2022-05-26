import axios from "axios";

export const getImages = async ({ page, perPage, value }) => {
    const APIkey = '27622975-8053d8179d4dd5adbee6b248d';
    const URL = `https://pixabay.com/api/?key=${APIkey}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}&fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads`;

    const result = await axios.get(URL).catch((error) => { console.log(error) });
    return result;
}