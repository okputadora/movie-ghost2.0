import axios from 'axios'

export default {
  movieSearch: axios.create({baseURL: 'https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie'}),
  actorSearch: axios.create({baseURL: 'https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/person'})
}
