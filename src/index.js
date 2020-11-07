import './styles.css';
import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';
import ImagesApiService from './js/apiService';
import imagesTpl from './imagesTemplate.hbs';
import LoadMoreBtn from './js/loadMoreBtn';
import onModalOpen from './js/modalOpen';
import * as basicLightbox from 'basiclightbox';
// import bigImageTemplate from './bigImageTemplate.hbs'


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
})

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch() {
  imagesApiService.query = refs.searchInput.value;
  if (imagesApiService.query === '') {
    return alert('write down smth')
  }
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

async function fetchImages() {
  loadMoreBtn.disable();
  // imagesApiService.fetchImages().then(data => {
  //   appendImagesMarkup(data);
  //   loadMoreBtn.enable();
  //   if (imagesApiService.page > 2) {
  //     window.scrollBy(0, window.innerHeight);
  //   }
  //   onModalOpen();
  // });

  try {
    const response = await imagesApiService.fetchImages()
    const images = appendImagesMarkup(response);
    const arrayUrl = response.map(response => response.largeImageURL);
    const arrayId = response.map(response => response.id);
    onModalOpen(arrayUrl, arrayId);
    
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



