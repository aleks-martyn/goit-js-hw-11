import Notiflix from 'notiflix';
import './css/styles.css';
import ImagesApiService from './searchImages-api';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

loadMoreBtn.classList.add('is-hidden');

formEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

function handleSubmit(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notiflix.Notify.failure('The line is empty!');
  }

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => {
    clearCardsContainer();
    renderGallery(hits);
    loadMoreBtn.classList.remove('is-hidden');
  });
}

function handleLoadMoreBtnClick(event) {
  imagesApiService.fetchImages().then(renderGallery);
}

function renderGallery(hits) {
  const markup = hits
    .map(hit => {
      return `<div class="photo-card">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>${hit.likes}
          </p>
          <p class="info-item">
            <b>Views</b><br>${hit.views}
          </p>
          <p class="info-item">
            <b>Comments</b><br>${hit.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b><br>${hit.downloads}
          </p>
         </div>
        </div>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearCardsContainer() {
  galleryEl.innerHTML = '';
}
