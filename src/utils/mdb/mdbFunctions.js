// Unfortunately this library is callback based (rather than promise based)
// and that's just not working out for given the number of calls I have to make
// Thus, this library just wraps the mdb functions in promises and while
// I'm at it, I'm filtering the data a bit to just grab what I need
const API_KEY = process.env.REACT_APP_MDB_KEY;
const mdb = require('moviedb')(API_KEY)

export default {
  getMovie: (title) => {
    return new Promise((resolve, reject) => {
      mdb.searchMovie({query: title}, (err, res) => {
        if (err){
          reject(err);
          return;
        }
        resolve({
          name: res.results[0].title,
          id: res.results[0].id,
          year: res.results[0].release_date.slice(0,4)
        })
      })
    })
  },
  getMoviesFromActor: (actor) => {
    return new Promise((resolve, reject) => {
      mdb.searchPerson({query: actor}, (err, res) => {
        if (err){
          reject(err);
          return;
        }
        resolve(res.results[0].known_for)
      })
    })
  },
  getActor: (actor) => {
    return new Promise((resolve, reject) => {
      mdb.searchPerson({query: actor}, (err, res) => {
        if (err){
          console.log("error getting actor")
          reject(err)
          return;
        }
        console.log("no err")
        resolve({
          name: res.results[0].name,
          id: res.results[0].id
        })
      })
    })
  },
  getCast: (movieId) => {
    return new Promise((resolve, reject) => {
      mdb.movieCredits({id: movieId}, (err, res) => {
        if (err){
          reject(err);
          return ;
        }
        // build a list of cast objects {name, id}
        let cast = res.cast.map(elem => ({name: elem.name.toLowerCase(), id: elem.id}));
        resolve(cast)
      })
    })
  },

  getImage: (id, fetchingMovie) => {
    return new Promise((resolve, reject) => {
      let baseUrl =  'http://image.tmdb.org/t/p/w185//'
      if (fetchingMovie){
        mdb.movieImages({id: id}, (err, res) => {
          console.log(res)
          let image = baseUrl + res.posters[0].file_path;
          resolve(image);
        })
      }
      else{
        mdb.personImages({id: id}, (err, res) => {
          console.log(res)
          let image = baseUrl + res.profiles[0].file_path;
          resolve(image)
        })
      }
    })
  }
}
