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
let hitsCounter = 0;

function handleSubmit(event) {
  event.preventDefault();
  hitsCounter = 0;

  if (!loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.add('is-hidden');
  }

  event.target.lastElementChild.setAttribute('disabled', true);
  imagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === '') {
    event.target.lastElementChild.removeAttribute('disabled');
    return Notiflix.Notify.failure('The line is empty!');
  }

  imagesApiService.resetPage();
  imagesApiService
    .fetchImages()
    .then(data => {
      const {
        data: { hits, totalHits },
      } = data;

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (hits.length === totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        loadMoreBtn.classList.remove('is-hidden');
      }

      hitsCounter += hits.length;

      clearCardsContainer();
      renderGallery(hits);
      event.target.lastElementChild.removeAttribute('disabled');
    })
    .catch(console.log);
}

function handleLoadMoreBtnClick(event) {
  event.target.setAttribute('disabled', true);
  imagesApiService
    .fetchImages()
    .then(data => {
      const {
        data: { hits, totalHits },
      } = data;

      hitsCounter += hits.length;

      if (hitsCounter >= totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }

      renderGallery(hits);
      event.target.removeAttribute('disabled');
    })
    .catch(console.log);
}

function renderGallery(hits) {
  const markup = hits
    .map(hit => {
      return `<div class="photo-card"><div class="photo">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" /></div>
        <div class="info">
          <p class="info-item">
            <b class="info-text">Likes</b><span>${hit.likes}</span>
          </p>
          <p class="info-item">
            <b class="info-text">Views</b><span>${hit.views}</span>
          </p>
          <p class="info-item">
            <b class="info-text">Comments</b><span>${hit.comments}</span>
          </p>
          <p class="info-item">
            <b class="info-text">Downloads</b><span>${hit.downloads}</span>
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
