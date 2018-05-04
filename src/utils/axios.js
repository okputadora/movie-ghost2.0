import axios from 'axios'

const movieSearchInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie'
})

// const idInstance = axios.create({
//   baseUrl: 'https://api.themoviedb.org/3/id/'
// })

export default movieSearchInstance;
