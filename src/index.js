const request = JSON.parse(localStorage.getItem('request')) || [];

const getUrl = (getCity, getState) => {
  const urlData = {
    root: 'http://api.openweathermap.org/data/2.5/weather?q=',
    city: getCity,
    state: getState,
    key: '&APPID=a462784b129e8666735d11a68b50dc6c'
  }
  const {root, city, state, key} = urlData;
  if (city.length === 0) {
    return `${root}${state}${key}`;
  } else if (state.length === 0) {
    return `${root}${city}${key}`
  } else {
    return `${root}${city},${state}${key}`
  }
};

const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const convertNull = (string) => {
  if(string === null){
    return '';
  } else {
    return string;
  }
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

const getWeather = async (url, city, state, pref) => {
  const data = await ( await fetch(url, {mode: 'cors'}).catch(errorHanlder)).json();
  dataHandler(data, city, state, pref);
};

const errorHanlder = (err) => {
  const response = new Response(
    JSON.stringify({
      cod: 404,
      message: 'City not found'
    })
  );
};

const decimals = (number) => {
  if(number % 1 !== 0) {
    return parseFloat(number.toFixed(2));
  } else {
    return number
  }
};

const dataHandler = (data, city, state, pref) => {
  if (data.cod === 200) {
    const weather = newWeather(data, city, state, pref);
    const userRequest = [weather, city, state, pref];
    localStorage.setItem('request', JSON.stringify(userRequest));
    location.reload();
  } else {
    const err = document.getElementById('error');
    err.textContent = cap(data.message);
  }
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

const placeValues = (city, state) => {
  if(state.length === 0) {
    return `The weather in ${city} is:`
  } else if (city.length === 0) {
    return `The weather in ${cap(state)} is:`
  } else {
    return location.textContent = `The weather in ${city}, ${cap(state)} is:`
  }
};

const showTemp = (data) => {
  switch (data.pref) {
    case '1':
      return `${data.celcius} °C`
    case '2':
      return `${data.fahrenheit} °F`
    case '3':
      return `${data.kelvin} °K`
  }
};

const dataTypeSet = (type, compare) => {
  if(type === compare) {
    return 'temp-switch';
  } else {
    return 'temp-switch temp-click';
  }
};

const dom = (weatherData) => {
  const pageContent = document.getElementById('page-content');
  const fragment = document.createDocumentFragment();
  const location = document.createElement('h1');
  location.textContent = placeValues(weatherData.city, weatherData.state);


  const temp = document.createElement('span');
  temp.id = 'temp';
  temp.textContent = showTemp(weatherData);

  const switchDiv = document.createElement('div');
  switchDiv.id = 'switch-type';
  switchDiv.classList = 'switch';

  const description = document.createElement('p');
  description.textContent = weatherData.description;
  const icon = document.createElement('img');
  icon.src = weatherData.icon;

  const c = document.createElement('span');
  c.textContent = '°C';
  c.id = 'celcius';
  c.classList = dataTypeSet('1', weatherData.pref);
  c.setAttribute('data-type', 'celcius');

  const f = document.createElement('span');
  f.textContent = '°F';
  f.id = 'fahrenheit';
  f.classList = dataTypeSet('2', weatherData.pref);
  f.classList.add('middle-temp');
  f.setAttribute('data-type', 'fahrenheit');

  const k = document.createElement('span');
  k.textContent = '°K';
  k.id = 'kelvin';
  k.setAttribute('data-type', 'kelvin');
  k.classList = dataTypeSet('3', weatherData.pref);

  fragment.appendChild(location);
  fragment.appendChild(description);
  fragment.appendChild(icon);
  fragment.appendChild(temp);
  switchDiv.appendChild(c);
  switchDiv.appendChild(f);
  switchDiv.appendChild(k);
  fragment.appendChild(switchDiv);
  pageContent.appendChild(fragment);
};

const showWeather = (data) => {
  if (data.length > 0) {
    dom(data[0]);
  }
};

showWeather(request);