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
import LazyLoad from 'vanilla-lazyload';


const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
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
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

async function fetchImages() {
 
  try {
    const response = await imagesApiService.fetchImages()
    const images = appendImagesMarkup(response);

    if (response.length === 0) {
      defaults.addClass = 'errorStyle';

      return error({
      text: 'No results found on your request'
  });
    }
    
    // if (imagesApiService.page > 2) {
    //   window.scrollBy(0, window.innerHeight);
    // }
    return images;
  } catch (error) {
    console.log(error)
  }
}

function appendImagesMarkup(data) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(data));
  lazyLoading();
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}


// Modal window for pics
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


// IntersectionObserver InfiniteScroll
const onEntry = entries => {

  entries.forEach(entry => {
    console.log(imagesApiService.searchQuery);
        if (entry.isIntersecting && imagesApiService.searchQuery !== "" && imagesApiService.searchQuery !== undefined) {
          fetchImages();
        }  
    })
}
const options = {
    rootMargin: '150px',
    // treshold: 0.5,
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel); 

// Lazy Loading 
function lazyLoading() {
const targets = document.querySelectorAll('img');

  const lazyLoad = target => {
  const options = {
    rootMargin: '150px',
};
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log('😍');

      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);

        observer.disconnect();
      }
    });
  }, options);

  io.observe(target)
};

targets.forEach(lazyLoad); 
}

