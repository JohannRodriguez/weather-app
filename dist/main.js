/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/conversionModule.js":
/*!*********************************!*\
  !*** ./src/conversionModule.js ***!
  \*********************************/
/*! namespace exports */
/*! export cap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export convertNull [provided] [no usage info] [missing usage info prevents renaming] */
/*! export decimals [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cap\": () => /* binding */ cap,\n/* harmony export */   \"convertNull\": () => /* binding */ convertNull,\n/* harmony export */   \"decimals\": () => /* binding */ decimals\n/* harmony export */ });\nconst cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);\n\nconst convertNull = (string) => {\n  if (string === null) {\n    return '';\n  }\n  return string;\n};\n\nconst decimals = (number) => {\n  if (number % 1 !== 0) {\n    return parseFloat(number.toFixed(2));\n  }\n  return number;\n};\n\n\n\n//# sourceURL=webpack://weather-app/./src/conversionModule.js?");

/***/ }),

/***/ "./src/domModule.js":
/*!**************************!*\
  !*** ./src/domModule.js ***!
  \**************************/
/*! namespace exports */
/*! export convertTemp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export dom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export errorMsg [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dom\": () => /* binding */ dom,\n/* harmony export */   \"convertTemp\": () => /* binding */ convertTemp,\n/* harmony export */   \"errorMsg\": () => /* binding */ errorMsg\n/* harmony export */ });\n/* harmony import */ var _conversionModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversionModule */ \"./src/conversionModule.js\");\n\n\nconst dataTypeSet = (type, compare) => {\n  if (type === compare) {\n    return 'temp-switch';\n  }\n  return 'temp-switch temp-click';\n};\n\nconst showTemp = (data) => {\n  switch (data.pref) {\n    case '1':\n      return `${data.celcius} °C`;\n    case '2':\n      return `${data.fahrenheit} °F`;\n    case '3':\n      return `${data.kelvin} °K`;\n    default:\n      return 'Not found';\n  }\n};\n\nconst placeValues = (city, state) => {\n  if (state.length === 0) {\n    return `The weather in ${city} is:`;\n  }\n  if (city.length === 0) {\n    return `The weather in ${(0,_conversionModule__WEBPACK_IMPORTED_MODULE_0__.cap)(state)} is:`;\n  }\n  return `The weather in ${city}, ${(0,_conversionModule__WEBPACK_IMPORTED_MODULE_0__.cap)(state)} is:`;\n};\n\n\nconst resetClasses = (tempsSwitch) => {\n  tempsSwitch.forEach(temps => {\n    temps.classList.add('temp-click');\n  });\n};\n\nconst dom = (weatherData) => {\n  const pageContent = document.getElementById('page-content');\n  const fragment = document.createDocumentFragment();\n  const location = document.createElement('h1');\n  location.textContent = placeValues(weatherData.city, weatherData.state);\n\n  const temp = document.createElement('span');\n  temp.id = 'temp';\n  temp.textContent = showTemp(weatherData);\n\n  const switchDiv = document.createElement('div');\n  switchDiv.id = 'switch-type';\n  switchDiv.classList = 'switch';\n\n  const description = document.createElement('p');\n  description.textContent = weatherData.description;\n  const icon = document.createElement('img');\n  icon.src = weatherData.icon;\n\n  const c = document.createElement('span');\n  c.textContent = '°C';\n  c.id = 'celcius';\n  c.classList = dataTypeSet('1', weatherData.pref);\n  c.setAttribute('data-type', 'celcius');\n\n  const f = document.createElement('span');\n  f.textContent = '°F';\n  f.id = 'fahrenheit';\n  f.classList = dataTypeSet('2', weatherData.pref);\n  f.classList.add('middle-temp');\n  f.setAttribute('data-type', 'fahrenheit');\n\n  const k = document.createElement('span');\n  k.textContent = '°K';\n  k.id = 'kelvin';\n  k.setAttribute('data-type', 'kelvin');\n  k.classList = dataTypeSet('3', weatherData.pref);\n\n  fragment.appendChild(location);\n  fragment.appendChild(description);\n  fragment.appendChild(icon);\n  fragment.appendChild(temp);\n  switchDiv.appendChild(c);\n  switchDiv.appendChild(f);\n  switchDiv.appendChild(k);\n  fragment.appendChild(switchDiv);\n  pageContent.appendChild(fragment);\n};\n\nconst convertTemp = (data) => {\n  const tempsSwitch = document.querySelectorAll('.temp-switch');\n  tempsSwitch.forEach(temps => {\n    temps.addEventListener('click', () => {\n      const tempTypeData = temps.dataset.type;\n      const temp = document.getElementById('temp');\n      switch (tempTypeData) {\n        case 'celcius':\n          temp.textContent = `${data.celcius} °C`;\n          resetClasses(tempsSwitch);\n          temps.classList.remove('temp-click');\n          break;\n        case 'kelvin':\n          temp.textContent = `${data.kelvin} °K`;\n          resetClasses(tempsSwitch);\n          temps.classList.remove('temp-click');\n          break;\n        case 'fahrenheit':\n          temp.textContent = `${data.fahrenheit} °F`;\n          resetClasses(tempsSwitch);\n          temps.classList.remove('temp-click');\n          break;\n        default:\n          temp.textContent = 'Not found';\n      }\n    });\n  });\n};\n\nconst errorMsg = (message) => {\n  const err = document.getElementById('error');\n  err.textContent = `Error: ${(0,_conversionModule__WEBPACK_IMPORTED_MODULE_0__.cap)(message)}`;\n  const holder = document.querySelector('.error-msg');\n  holder.classList.remove('invisible');\n};\n\n\n\n//# sourceURL=webpack://weather-app/./src/domModule.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domModule */ \"./src/domModule.js\");\n/* harmony import */ var _conversionModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversionModule */ \"./src/conversionModule.js\");\n\n\n\nconst request = JSON.parse(localStorage.getItem('request')) || [];\n\nconst getUrl = (getCity, getState) => {\n  const urlData = {\n    root: 'https://api.openweathermap.org/data/2.5/weather?q=',\n    city: getCity,\n    state: getState,\n    key: '&APPID=a462784b129e8666735d11a68b50dc6c',\n  };\n  const {\n    root, city, state, key,\n  } = urlData;\n\n  if (city.length === 0) {\n    return `${root}${state}${key}`;\n  }\n  if (state.length === 0) {\n    return `${root}${city}${key}`;\n  }\n  return `${root}${city},${state}${key}`;\n};\n\nconst errorHanlder = (err) => {\n  const response = new Response(\n    JSON.stringify({\n      cod: 404,\n      message: 'City not found',\n    }),\n  );\n  err = response;\n  return err;\n};\n\nconst newWeather = (weatherData, city, state, pref) => {\n  const kelvin = weatherData.main.temp;\n  const celciusCalc = (kelvin - 273.15);\n  const fahrenheitCalc = (celciusCalc * 9) / 5 + 32;\n  const celcius = (0,_conversionModule__WEBPACK_IMPORTED_MODULE_1__.decimals)(celciusCalc);\n  const fahrenheit = (0,_conversionModule__WEBPACK_IMPORTED_MODULE_1__.decimals)(fahrenheitCalc);\n  const { weather } = weatherData;\n  const [first] = weather;\n  const { description } = first;\n  const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;\n  return {\n    city, state, kelvin, celcius, fahrenheit, pref, description, icon,\n  };\n};\n\nconst dataHandler = (data, city, state, pref) => {\n  if (data.cod === 200) {\n    const weather = newWeather(data, city, state, pref);\n    const userRequest = [weather, city, state, pref];\n    localStorage.setItem('request', JSON.stringify(userRequest));\n    window.location.reload();\n  } else {\n    (0,_domModule__WEBPACK_IMPORTED_MODULE_0__.errorMsg)(data.message);\n  }\n};\n\nconst getWeather = async (url, city, state, pref) => {\n  const data = await (await fetch(url, { mode: 'cors' }).catch(errorHanlder)).json();\n  dataHandler(data, city, state, pref);\n};\n\nconst submitBtn = document.getElementById('submit-form');\nsubmitBtn.addEventListener('click', (event) => {\n  event.preventDefault();\n  const getCity = (0,_conversionModule__WEBPACK_IMPORTED_MODULE_1__.cap)(document.getElementById('city-name').value);\n  const getState = document.getElementById('state-name').value.toLowerCase();\n  const getPref = document.getElementById('temp-types').value;\n  const city = (0,_conversionModule__WEBPACK_IMPORTED_MODULE_1__.convertNull)(getCity);\n  const state = (0,_conversionModule__WEBPACK_IMPORTED_MODULE_1__.convertNull)(getState);\n  const url = getUrl(city, state);\n  getWeather(url, getCity, getState, getPref);\n});\n\n(0,_domModule__WEBPACK_IMPORTED_MODULE_0__.dom)(request[0]);\n(0,_domModule__WEBPACK_IMPORTED_MODULE_0__.convertTemp)(request[0]);\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;