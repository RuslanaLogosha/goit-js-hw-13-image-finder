import './styles.css';
import getRefs from './js/get-refs'
import ImagesApiService from './js/apiService'
// import onFetchError from './js/fetchError'
import imagesTpl from './imagesTemplate.hbs'


const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('input', onSearch);

function onSearch(event) {
  event.preventDefault();
  imagesApiService.query = event.currentTarget.elements.query.value;
  if (imagesApiService.query === '') {
    return alert('write down smth')
  }
  fetchImages();
}

function fetchImages() {
  imagesApiService.fetchImages().then(data => {
    console.log(data)
    appendImagesMarkup(data);
  })
}

function appendImagesMarkup(data) {
  refs.imagesContainer.innerHTML = imagesTpl(data);
}