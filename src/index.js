import './css/styles.css';
import ImagesApiService from './searchImages-api';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

formEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

let searchQuery = '';

function handleSubmit(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value;

  imagesApiService.fetchImages(searchQuery);
}

function handleLoadMoreBtnClick(event) {
  imagesApiService.fetchImages(searchQuery);
}
