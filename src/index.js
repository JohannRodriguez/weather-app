import { dom, convertTemp, errorMsg } from './domModule';
import { cap, convertNull, decimals } from './conversionModule';

const request = JSON.parse(localStorage.getItem('request')) || [];

const getUrl = (getCity, getState) => {
  const urlData = {
    root: 'http://api.openweathermap.org/data/2.5/weather?q=',
    city: getCity,
    state: getState,
    key: '&APPID=a462784b129e8666735d11a68b50dc6c',
  };
  const { root, city, state, key } = urlData;

  if (city.length === 0) {
    return `${root}${state}${key}`;
  }
  if (state.length === 0) {
    return `${root}${city}${key}`;
  }
  return `${root}${city},${state}${key}`;
};


const newWeather = (weatherData, city, state, pref) => {
  const kelvin = weatherData.main.temp;
  const celciusCalc = (kelvin - 273.15);
  const fahrenheitCalc = celciusCalc * 9 / 5 + 32;
  const celcius = decimals(celciusCalc);
  const fahrenheit = decimals(fahrenheitCalc);
  const description = weatherData.weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  return { city, state, kelvin, celcius, fahrenheit, pref, description, icon };
};

const dataHandler = (data, city, state, pref) => {
  if (data.cod === 200) {
    const weather = newWeather(data, city, state, pref);
    const userRequest = [weather, city, state, pref];
    localStorage.setItem('request', JSON.stringify(userRequest));
    location.reload();
  } else {
    errorMsg(data.message);
  }
};

const getWeather = async (url, city, state, pref) => {
  const data = await ( await fetch(url, {mode: 'cors'}).catch(errorHanlder)).json();
  dataHandler(data, city, state, pref);
};

const submitBtn = document.getElementById('submit-form');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const getCity = cap(document.getElementById('city-name').value);
  const getState = document.getElementById('state-name').value.toLowerCase();
  const getPref = document.getElementById('temp-types').value;
  const city = convertNull(getCity);
  const state = convertNull(getState);
  const url = getUrl(city, state);
  getWeather(url, getCity, getState, getPref);
});

const errorHanlder = (err) => {
  const response = new Response(
    JSON.stringify({
      cod: 404,
      message: 'City not found'
    })
  );
};

dom(request[0]);
convertTemp(request[0]);