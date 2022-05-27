import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { imgParams } from './js/getImages';
import { getImages } from './js/getImages';
import { markupResult } from './js/markupResult';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const sentinal = document.querySelector('.sentinal');
const options = {
    rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

const onFormSubmit = (evt) => {
    observer.disconnect();
    evt.preventDefault();
    imgParams.q = '';
    imgParams.page = 1;
    gallery.innerHTML = '';
    eventHandler(evt);
}

const eventHandler = (evt) => {
    if (evt.target.elements.searchQuery.value === '') {
        Notify.info('Please, enter a word for search!');
    } else {
        imgParams.q = evt.target.elements.searchQuery.value;
        getImages(imgParams).then((result) => {
            createGallery(result.data);
            observer.observe(sentinal);
        });
    } 
}

const createGallery = (object) => {
    const totalHits = object.totalHits;
    const hitsArray = object.hits;
    if (hitsArray.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again');
    } else {
        Notify.success(`Hooray! We found ${totalHits} images`);
        markupResult(hitsArray, gallery);
        imgParams.page += 1;
    }
}

function onEntry(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            getImages(imgParams).then((result) => {
                createGallery(result.data);
            });
        }
    })
}

form.addEventListener('submit', onFormSubmit);