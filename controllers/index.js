const User = require("../models/User")
const Promise = require("bluebird")

module.exports = {
  // Get all documents of the model
  get: () => {
    return new Promise((resolve, reject) => {
      User.find((err, result) => {
        if (err) {
          reject(err)
          return;
        }
        resolve(result);
      })
    })
  },
  // get document that matches id
  getById: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, result) => {
        if (err){
          reject(err)
          return
        }
        resolve(result)
      })
    })
  },
  // Get documents that match a specific parameter
  getByParams: (params) => {
    return new Promise((resolve, reject) => {
      User.find(params, null, (err, result) => {
        if (err){
          reject(err)
          return
        }
        resolve(result);
      })
    })
  },
  // Create a new document
  post: (params) => {
    return new Promise((resolve, reject) => {
      User.create(params, (err, result) => {
        if (err){
          reject(err)
          return
        }
        resolve(result)
        return
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
