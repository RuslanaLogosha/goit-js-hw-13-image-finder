export default function getRefs() {
    return {
        searchForm: document.querySelector('.js-search-form'),
        searchInput: document.querySelector('.js-search-input'),
        imagesContainer: document.querySelector('.gallery'),
        sentinel: document.querySelector('#sentinel'),
    };
}