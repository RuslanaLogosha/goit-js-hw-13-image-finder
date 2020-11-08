import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


export default function onModalOpen(arrayUrl, arrayId) {

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('img');
    images.forEach(image => { image.addEventListener('click', e => {
          const clickedImage = e.target;
          lightbox.classList.add('active');
          const img = document.createElement('img');
          const picId = arrayId.find(id => id == clickedImage.id);
          const index = arrayId.indexOf(picId);
          if (picId) {
              const instance = basicLightbox.create(`
              <img src="${arrayUrl[index]}" width="800" height="600">`)
              instance.show()
          }     
  })
})
}