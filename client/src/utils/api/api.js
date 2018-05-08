const axios = require('axios')

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      axios.post("/api/user")
      .then(result => {
        resolve(result)
      })
    })
  }
}
