import './index.css';
import '../vendor/normalize.css';
import Swiper from 'swiper';
import WeatherApi from './WeatherApi';
import GetWeather from './GetWeather';
import {
  weather,
  menuMobile,
  menuMobileIcon,
  menuMobileCloseIcon,
} from './const/const';

const header = document.querySelector('.header');
const API_WEATHER = NODE_ENV === 'production' ? 'https://api.openweathermap.org/' : 'https://api.openweathermap.org/';
const weatherApi = new WeatherApi(API_WEATHER);
const getWeather = new GetWeather(weatherApi);

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});


  getWeather.getWeatherData('Saint Petersburg', weather);
  getWeather.getWeatherData('Moscow', weather);
  getWeather.getWeatherData('Veliky Novgorod', weather);
  getWeather.getWeatherData('Pskov', weather);
  getWeather.getWeatherData('Tver', weather);
  getWeather.getWeatherData('Kazan', weather);
  getWeather.getWeatherData('Perm', weather);

function renderSwiper() {
    var swiper = new Swiper('.swiper-container', {
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 'auto',
      paginationClickable: true,
      centeredSlides: true,
      spaceBetween: 30,
    })
  }


setTimeout(renderSwiper, 800);


menuMobileIcon.addEventListener('click', () => {
  menuMobile.style.display = 'flex';
});

menuMobileCloseIcon.addEventListener('click', () => {
  menuMobile.style.display = 'none';
});
