export const monthSplit = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
export const msDay = 86400000;

export function getDate() {
  const todayDate = new Date();
  const dateInMs = 6 * msDay;
  const lastDate = new Date(todayDate.getTime() - dateInMs);
  const dateFrom = lastDate.toISOString().slice(0, 10);
  const dateTo = todayDate.toISOString().slice(0, 10);

  return { dateFrom, dateTo };
}

export function setDate(data) {
  const date = new Date(data);
  const month = monthSplit[date.getMonth()];

  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}

export const newsInput = document.querySelector('.news__input');
export const cardsArray = [];
export const results = document.querySelector('.results');
export const resultsGrid = document.querySelector('.results__grid');
export const pagination = document.querySelector('.results__pagination');
export const resultsCard = document.querySelector('.results__card');
export const paginationLi = document.querySelectorAll('.results__pagination-li');
export const paginationButton = document.querySelectorAll('.results__pagination-number');
export const articlesOfPage = 9;
export const weather = document.querySelector('.swiper-wrapper');
export const menuMobile = document.querySelector('.header__nav-mobile');
export const menuMobileIcon = document.querySelector('.header__nav-icon-mobile');
export const menuMobileCloseIcon = document.querySelector('.header__nav-mobile-close');
