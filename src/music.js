import './index.css';
import '../vendor/normalize.css';
import {
  menuMobile,
  menuMobileIcon,
  menuMobileCloseIcon,
}
  from './const/const';

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

fetch('http://www.last.fm/api/auth/?api_key=bbb1af989d4fdaa3fce4506006be9ddf')
.then((res) => {
  console.log(res);
});


menuMobileIcon.addEventListener('click', () => {
  menuMobile.style.display = 'flex';
});

menuMobileCloseIcon.addEventListener('click', () => {
  menuMobile.style.display = 'none';
});

