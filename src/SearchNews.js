import {
  setDate,
  newsInput,
  resultsGrid,
  pagination,
  articlesOfPage,
}
from './const/const';


export default class SearchNews {
  constructor(newsApi) {
    this.newsApi = newsApi;
  }

  getNews = () => {
    this.deleteItems(resultsGrid);
    this.deleteItems(pagination);
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
                <img class="results__image" src='${data.articles[i].urlToImage}' onError="this.onerror=null; this.src='https://www.cellularlineservices.com/wp-content/uploads/revslider/fullscreen-menu/work_space_1.jpg';" />
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

        let countOfItems = Math.ceil(data.articles.length / articlesOfPage );
        let paginationLi = [];

        for (let i = 1; i <= countOfItems; i++) {
          let pagButton = document.createElement('li');
            pagButton.classList.add('results__pagination-number');
            pagButton.innerHTML = i;
            pagination.appendChild(pagButton);
            paginationLi.push(pagButton);
        }
        paginationLi[0].classList.add('active');
        pagination.style.display = 'grid';

        for (let li of paginationLi) {
          li.addEventListener('click', () => {

            let pageNum = li.textContent;
            let start = (pageNum - 1) * articlesOfPage;
            let end = start + articlesOfPage;

            let articlesList = data.articles.slice(start, end);

            paginationLi.forEach((lastButton) => lastButton.classList.remove('active'));
            li.classList.add('active');

            resultsGrid.innerHTML = '';
            for (let article of articlesList) {
              resultsGrid.insertAdjacentHTML('beforeend',
              `
              <a class="results__card" href="${article.url}">
                    <div class="inner">
                    <img class="results__image" src='${article.urlToImage}' onError="this.onerror=null; this.src='https://www.cellularlineservices.com/wp-content/uploads/revslider/fullscreen-menu/work_space_1.jpg';" />
                    </div>
                        <p class="results__date">${setDate(article.publishedAt)}</p>
                        <h2 class="results__title">${article.title}</h2>
                        <p class="results__text">${(article.description).replaceAll(/<[^>]*>/g, '')}</p>
                        <div class="results__bottom">
                          <p class="results__source">${article.source.name}</p>
                        </div>

                    </div>
              `
              )}
          })
        }

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

  deleteItems = (item) => {
    item.innerHTML = '';
  }
}
