const axios = require('axios')

module.exports = {
  newUser: (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/user", {name: data.username, password: data.password})
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
