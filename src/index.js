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

const dataHandler = (data, city, state, pref) => {
  if (data.cod === 200) {
    const userRequest = [city, state, pref];
    localStorage.setItem('request', JSON.stringify(userRequest));
    location.reload();
  } else {
    const err = document.getElementById('error');
    err.textContent = cap(data.message);
  }
};