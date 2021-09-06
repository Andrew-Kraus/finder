import './index.css';
import '../vendor/normalize.css';

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

const iconTg = document.querySelector('.biography__icon-tg');
const tgId = document.querySelector('.biography__telegram');

iconTg.addEventListener('mousemove', () => {
  tgId.style.display = 'block';
});
