// const fetchCountries = 'https://restcountries.com/v3.1/name/'

// export default fetchCountries ;
// function fetchCountries() {
//     return fetch(`https://restcountries.com/v3.1/name/`)
//         .then(response =>
//         {
//         if (!response.ok) {
//         throw new Error(response.status)
//         }
//         return response.json()
//         })
//         .catch(error => error.message)
        
// }

export function fetchCountries(searchTerm) {
  return fetch(`https://restcountries.com/v2/name/${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}