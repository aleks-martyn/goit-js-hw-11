export default class ImagesApiService {
  constructor() {}

  fetchImages(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34753059-f7902d1f02de9c533025c1a5e';

    const searchParams = new URLSearchParams({
      key: `${API_KEY}`,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: 1,
    });

    const url = `${BASE_URL}?${searchParams}`;
    console.log(url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(console.log);
  }
}
