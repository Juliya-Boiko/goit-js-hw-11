import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from './js/getImages';
import { markupResult } from './js/markupResult';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const params = {
    page: 1,
    perPage: 40,
};

const onFormSubmit = (evt) => {
    evt.preventDefault();
    loadMoreBtn.classList.add('is-hidden');
    params.page = 1;
    gallery.innerHTML = '';
    eventHandler(evt);
}

const eventHandler = (evt) => {
    if (evt.target.elements.searchQuery.value === '') {
        Notify.info('Please, enter a word for search!');
    } else {
        params.value = evt.target.elements.searchQuery.value;
        getImages(params).then((result) => {
            createGallery(result.data);
        });
    } 
}

const createGallery = (object) => {
    const totalHits = object.totalHits;
    const hitsArray = object.hits;
    if (hitsArray.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again');
    } else {
        if (params.page === 1) {
            Notify.success(`Hooray! We found ${totalHits} images`);   
        }
        markupResult(hitsArray, gallery);
        if (params.page > 1) {
            const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        }
        if (totalHits > params.perPage) {
            loadMoreBtn.classList.remove('is-hidden');
        } else (loadMoreBtn.classList.add('is-hidden'));
    }
}

const onLoadMoreBtnCkick = () => {
    params.page += 1;
    getImages(params).then((result) => { createGallery(result.data) });
    gallery.refresh();
}

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnCkick);