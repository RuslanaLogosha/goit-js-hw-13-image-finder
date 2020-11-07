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
              img.src = arrayUrl[index];
          }
      
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
      lightbox.appendChild(img);
  })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})
    
}

