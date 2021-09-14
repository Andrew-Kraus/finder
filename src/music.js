import './test.css';
import './index.css';
import '../vendor/normalize.css';


const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});
