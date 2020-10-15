import { cap } from './conversionModule';

const dataTypeSet = (type, compare) => {
  if (type === compare) {
    return 'temp-switch';
  }
  return 'temp-switch temp-click';
};

const showTemp = (data) => {
  switch (data.pref) {
    case '1':
      return `${data.celcius} °C`;
    case '2':
      return `${data.fahrenheit} °F`;
    case '3':
      return `${data.kelvin} °K`;
    default:
      return 'Not found';
  }
};

const placeValues = (city, state) => {
  if (state.length === 0) {
    return `The weather in ${city} is:`;
  }
  if (city.length === 0) {
    return `The weather in ${cap(state)} is:`;
  }
  return `The weather in ${city}, ${cap(state)} is:`;
};


const resetClasses = (tempsSwitch) => {
  tempsSwitch.forEach(temps => {
    temps.classList.add('temp-click');
  });
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

const convertTemp = (data) => {
  const tempsSwitch = document.querySelectorAll('.temp-switch');
  tempsSwitch.forEach(temps => {
    temps.addEventListener('click', () => {
      const tempTypeData = temps.dataset.type;
      const temp = document.getElementById('temp');
      switch (tempTypeData) {
        case 'celcius':
          temp.textContent = `${data.celcius} °C`;
          resetClasses(tempsSwitch);
          temps.classList.remove('temp-click');
          break;
        case 'kelvin':
          temp.textContent = `${data.kelvin} °K`;
          resetClasses(tempsSwitch);
          temps.classList.remove('temp-click');
          break;
        case 'fahrenheit':
          temp.textContent = `${data.fahrenheit} °F`;
          resetClasses(tempsSwitch);
          temps.classList.remove('temp-click');
          break;
        default:
          temp.textContent = 'Not found';
      }
    });
  });
};

const errorMsg = (message) => {
  const err = document.getElementById('error');
  err.textContent = `Error: ${cap(message)}`;
  const holder = document.querySelector('.error-msg');
  holder.classList.remove('invisible');
};

export { dom, convertTemp, errorMsg };