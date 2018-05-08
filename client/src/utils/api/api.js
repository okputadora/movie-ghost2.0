const axios = require('axios')

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      axios.get("/api/users")
      .then(result => {
        resolve(result)
      })
    })
  }
}
