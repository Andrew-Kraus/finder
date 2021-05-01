import './index.css';
import '../vendor/normalize.css';
import NewsApi from './NewsApi';
import SearchNews from './SearchNews';

const header = document.querySelector('.header');
const API_NEWS = NODE_ENV === 'production' ? 'https://nomoreparties.co/news/v2/' : 'http://nomoreparties.co/news/v2/';
const newsApi = new NewsApi(API_NEWS);
const searchNews = new SearchNews(newsApi);
const newsSubmit = document.querySelector('.news__submit');
const paginationButton = document.querySelectorAll('.results__pagination-number');

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

newsSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  searchNews.getNews();
});

paginationButton.forEach((element) => {
  element.addEventListener('click', () => {
    paginationButton.forEach((lastButton) => lastButton.classList.remove('active'));
    element.classList.add('active');
  });
});
