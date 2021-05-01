const newsInput = document.querySelector('.news__input');
const cardsArray = [];
const results = document.querySelector('.results');
const resultsGrid = document.querySelector('.results__grid');
const pagination = document.querySelector('.results__pagination')
const resultsCard = document.querySelector('.results__card');
const paginationLi = document.querySelectorAll('.results__pagination-li');
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
let articlesOfPage = 9;


export default class SearchNews {
  constructor(newsApi) {
    this.newsApi = newsApi;
  }

  getNews = () => {
    resultsGrid.innerHTML = '';
    this.notFound(false);
    this.preloader(true);
    this.newsApi.getNewsApi(newsInput.value)
    .then((data) => {
      if (data.articles.length == 0) {
        this.notFound(true);
        }
        for (let i = 0; i < 9; i++) {
          resultsGrid.insertAdjacentHTML('beforeend',
          `
          <a class="results__card" href="${data.articles[i].url}">
                <div class="inner">
                  <img class="results__image" src='${data.articles[i].urlToImage}' onerror="this.onerror=null; this.src="<%=require('../images/work_space_1.jpg')%>">
                </div>
                    <p class="results__date">${setDate(data.articles[i].publishedAt)}</p>
                    <h2 class="results__title">${data.articles[i].title}</h2>
                    <p class="results__text">${data.articles[i].description}</p>
                    <div class="results__bottom">
                      <p class="results__source">${data.articles[i].source.name}</p>
                    </div>

                </div>
          `
        )}
        for (let li of paginationLi) {
          li.addEventListener('click', function() {
            let pageNum = li.textContent;
            let start = (pageNum - 1) * articlesOfPage;
            let end = start + articlesOfPage;
            let articlesList = data.articles.slice(start, end);
            console.log(articlesList);
            resultsGrid.innerHTML = '';
            for (let article of articlesList) {
              console.log(article);
              resultsGrid.insertAdjacentHTML('beforeend',
              `
              <a class="results__card" href="${article.url}">
                    <div class="inner">
                      <img class="results__image" src='${article.urlToImage}' onerror="this.onerror=null; this.src="<%=require('../images/work_space_1.jpg')%>">
                    </div>
                        <p class="results__date">${article.publishedAt}</p>
                        <h2 class="results__title">${article.title}</h2>
                        <p class="results__text">${article.description}</p>
                        <div class="results__bottom">
                          <p class="results__source">${article.source.name}</p>
                        </div>

                    </div>
              `
              )}
          })
        }

      pagination.style.display = 'flex';


    })
    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      this.preloader(false);
    });
  }

  preloader = isLoading => {
    this.spinner = document.querySelector('.preloader');

    isLoading
      ? this.spinner.style.display = 'block'
      : this.spinner.style.display = 'none';
  }

  notFound = falseOrTrue => {
    this.resultsNotFound = document.querySelector('.results__not-found-container');

    falseOrTrue
      ? this.resultsNotFound.style.display = 'flex'
      : this.resultsNotFound.style.display = 'none';
  }

}
