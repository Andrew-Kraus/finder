
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
        return 'https://cdn.pixabay.com/photo/2020/03/06/02/02/cloud-4905880_1280.png';
      } else if (status === 'Rain') {
        return 'https://image.flaticon.com/icons/svg/1146/1146858.svg';
      }
    }

    weatherStatusName = (status) => {
      if (status === 'Clear') {
        return 'Солнечно';
      } else if (status === 'Clouds') {
        return 'Облачно';
      } else if (status === 'Rain') {
        return 'Дождь';
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

