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

  if (!loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.add('is-hidden');
  }

  event.target.lastElementChild.setAttribute('disabled', true);
  imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notiflix.Notify.failure('The line is empty!');
  }

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => {
    clearCardsContainer();
    renderGallery(hits);
    event.target.lastElementChild.removeAttribute('disabled');
    loadMoreBtn.classList.remove('is-hidden');
  }).catch(console.log);
}

function handleLoadMoreBtnClick(event) {
  event.target.setAttribute('disabled', true);
  imagesApiService.fetchImages().then(hits => {
    renderGallery(hits);
    event.target.removeAttribute('disabled');
  }).catch(console.log);
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
