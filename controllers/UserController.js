const User = require("../models/User")
const bcrypt = require('bcrypt')
const Promise = require("bluebird")

module.exports = {
  // Get all documents of the model
  get: () => {
    return new Promise((resolve, reject) => {
      User.find((err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
    })
  },
  // get document that matches id
  getById: (id) => {
    console.log("getting by id ",id)
    return new Promise((resolve, reject) => {
      console.log(id)
      User.findById(id, (err, result) => {
        if (err){
          return reject(err);
        }
        resolve(result)
      })
    })
  },
  // Get documents that match a specific parameter
  getByParams: (params) => {
    return new Promise((resolve, reject) => {
      console.log(params)
      User.find(params, null, (err, user) => {
        if (err){
          return reject(err);
        }
        resolve(user[0].summary());
      })
    })
  },
  // Check if a user exists / create a new user
  post: (params) => {
    return new Promise((resolve, reject) => {
      console.log("begin post controller")
      // check to see if this user exists
      let username = params.username;
      User.find({username: username}, null, (err, users) => {
        if (users.length === 0){
          // create user
          let password = params.password;
          // encrypt the password
          params.password = bcrypt.hashSync(password, 10);
          User.create(params, (err, result) => {
            if (err){
              reject(err)
              return
            }
            resolve(result)
            return
          })
          return;
        }
        // else check the password
        bcrypt.compare(params.password, users[0].password, (err, res) => {
          if (err){
            console.log(err)
            reject("You entered an incorrect password or that username is already in use")
            return;
          }
          resolve(users[0].summary())
        })
      })
    })
  },

  // update by id with params
  update: (id, params) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(id, params, (err, result) => {
        if (err){
          reject(err)
          return
        }
        resolve(result)
        return
      })
    })
  },

  // delete
  remove: (id) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndRemove(id, (err, result) => {
        if (err){
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }
}
