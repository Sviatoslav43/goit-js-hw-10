const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryRef = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export { inputRef, countryListRef, countryRef, DEBOUNCE_DELAY, BASE_URL };