import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import debounce from 'lodash.debounce';

import getRefs from './js/get-refs';
import ImagesApiService from './js/apiService';
import imagesTpl from './imagesTemplate.hbs';
import LoadMoreBtn from './js/loadMoreBtn';


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
})

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.imagesContainer.addEventListener('click', onModalOpen);


function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = refs.searchInput.value;
  if (imagesApiService.query === '') {
    
  defaults.addClass = 'errorStyle';

   return error({
    text: 'Please,write down something'
  });
  }
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

async function fetchImages() {
  loadMoreBtn.disable();

  try {
    const response = await imagesApiService.fetchImages()
    const images = appendImagesMarkup(response);
    
    if (response.length === 0) {
      loadMoreBtn.hide();
      defaults.addClass = 'errorStyle';

      return error({
      text: 'No results found on your request'
  });
    }
    loadMoreBtn.enable();
    
    if (imagesApiService.page > 2) {
      window.scrollBy(0, window.innerHeight);
    }
    return images;
  } catch (error) {
    console.log(error)
  }
}

function appendImagesMarkup(data) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(data));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function onModalOpen(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const modalMarkup = `
    <img src=${e.target.dataset.source} width="800" height="600">
`;
  const instance = basicLightbox.create(modalMarkup);

  instance.show();
}

