const axios = require('axios')

module.exports = {
  newUser: (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/user", {username: data.username, password: data.password})
      .then(result => {
        resolve(result.data)
      })
    })
  },

  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      axios.get("api/user")
      .then(result => resolve(result))
    })
  }
}
