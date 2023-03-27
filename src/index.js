import './css/styles.css';
import ImagesApiService from './searchImages-api';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

formEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

function handleSubmit(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => console.log(hits));
}

function handleLoadMoreBtnClick(event) {
  imagesApiService.fetchImages();
}
