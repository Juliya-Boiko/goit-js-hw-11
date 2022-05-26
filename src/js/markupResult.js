import cardMarkup from '../templates/cardMarkup.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const markupResult = (array, container) => {
    const markup = cardMarkup(array);
    
    container.insertAdjacentHTML('beforeend', markup);

    let lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250
    });
}