
export default class GetWeather {
  constructor(weatherApi) {
    this.weatherApi = weatherApi;
  }

  getWeatherData = (city, section) => {
    this.weatherApi.getWeatherApi(city)
    .then((data) => {
      section.insertAdjacentHTML('beforeend',
      `
      <div class="swiper-slide weather__card">
    <h3 class="weather__card-title">${this.cityNameTranslation(city)}</h3>
    <h4 class="weather__card-status">${this.weatherStatusName(data.weather[0].main)}</h4>
    <img class="weather__card-icon" src='${this.weatherStatus(data.weather[0].main)}' alt="Изображение не загрузилось">
    <h2 class="weather__card-deg">${this.kToC(data.main.temp)}<sup>&deg;</sup></h2>
    <div class="weather__card-details">
      <div class="weather__card-min">
        <p class="weather__card-value">max</p>
        <span>${this.kToC(data.main.temp_max)}<sup>&deg;</sup></span>
      </div>
      <div class="weather__card-max">
        <p class="weather__card-value">min</p>
        <span>${this.kToC(data.main.temp_min)}<sup>&deg;</sup></span>
      </div>
    </div>
  </div>
      `);
})
    }

    kToC = (kel) => {
      const cel = kel - 273.15;
      return Math.round(cel);
    }

    weatherStatus = (status) => {
      if (status === 'Clear') {
        return 'https://www.pinclipart.com/picdir/big/44-442469_cctv-camera-clipart.png';
      } else if (status === 'Clouds') {
        return 'https://www.pinclipart.com/picdir/big/523-5239101_symbol-cloudy-weather-forecast-clipart.png';
      } else if (status === 'Rain') {
        return 'https://www.pinclipart.com/picdir/big/85-857176_rainy-weather-icon-rainy-icon-clipart.png';
      } else {
        return 'https://www.pinclipart.com/picdir/big/548-5482660_thunderstorm-clipart-png-download.png';
      }
    }

    weatherStatusName = (status) => {
      if (status === 'Clear') {
        return 'Солнечно';
      } else if (status === 'Clouds') {
        return 'Облачно';
      } else if (status === 'Rain') {
        return 'Дождь';
      } else {
        return 'Гроза';
      }
    }

    cityNameTranslation = (city) => {
      if (city === 'Saint Petersburg') {
        return 'Санкт-Петербург';
      } else if (city === 'Moscow') {
        return 'Москва';
      } else if (city === 'Veliky Novgorod') {
        return 'Великий Новгород';
      } else if (city === 'Pskov') {
        return 'Псков';
      } else if (city === 'Tver') {
        return 'Тверь';
      } else if (city === 'Kazan') {
        return 'Казань';
      } else if (city === 'Perm') {
        return 'Пермь';
      }
    }
  }

