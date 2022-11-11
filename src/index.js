import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function searchCountry(e) {
  const searchTerm = searchBox.value.trim();

  fetchCountries(searchTerm)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (searchTerm !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

  e.preventDefault();
};

function countriesData(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (data.length > 1 && data.length <= 10) {
    clearData(countryList);
    clearData(countryInfo);

     const countries = data.map(({flags, name}) =>
      ` <li class = 'country'>
          <img src = '${flags.svg}' />
          <p>${name}</p>
        </li>`
       ).join('');
    return countryInfo.innerHTML = countries
  } else {
    clearData(countryList);
    clearData(countryInfo);

    return (countryInfo.innerHTML = data
      .map(
        ({flags, name, region, capital, population, languages}) => 
      ` <div class = 'country'> 
          <img src = '${flags.svg}' />
            <div class = 'country-body'>
              <h3 class ="country-title ">${name}</h3>
              <p><b>Region: </b> ${region}</p>
              <p><b>Capital: </b> ${capital}</p>
              <p><b>Population: </b> ${population.toLocaleString()}</p>
              <p><b>Languages: </b> ${languages[0].name}</p>
            </div>
        </div>`
      ).join(''));
  }
}

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearData(output) {
  output.innerHTML = '';
}

searchBox.insertAdjacentHTML(
  'beforebegin',
  '<header><h1>Country Finder</h1></header>'
);
document.querySelector('#search-box').placeholder = 'Search for any country...';