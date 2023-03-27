import './css/styles.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const searchQuery = event.currentTarget.elements.searchQuery.value;

  const searchParams = new URLSearchParams({
      key: '34753059-f7902d1f02de9c533025c1a5e',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
  });

    const url = `https://pixabay.com/api/?${searchParams}`;
    console.log(url);
    
    fetch(url).then(response => response.json()).then(console.log)
}
