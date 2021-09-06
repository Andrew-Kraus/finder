import './index.css';
import '../vendor/normalize.css';

const header = document.querySelector('.header');
const menuMobileIcon = document.querySelector('.header__nav-icon-mobile');
const menuMobile = document.querySelector('.header__nav-mobile');
const menuMobileCloseIcon = document.querySelector('.header__nav-mobile-close');

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

menuMobileIcon.addEventListener('click', () => {
  menuMobile.style.display = 'flex';
});

menuMobileCloseIcon.addEventListener('click', () => {
  menuMobile.style.display = 'none';
});
