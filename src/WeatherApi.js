export default class WeatherApi {
  constructor(settings) {
    this.settings = settings;
  }

  getWeatherApi(city) {
    return fetch(`${this.settings}/data/2.5/weather?q=${city}&appid=620f14f5bf4191b16224cd27dd53d252`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}
