const axios = require('axios')

module.exports = {
  newUser: (data) => {
    // check to see if this username is taken
    return new Promise((resolve, reject) => {
      axios.post("/api/user" + data.username)
      .then(result => console.log(result))
    })
    // return new Promise((resolve, reject) => {
    //   axios.post("/api/user", data)
    //   .then(result => {
    //     resolve(result)
    //   })
    // })
  }
}
