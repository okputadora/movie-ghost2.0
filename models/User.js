var mongoose = require('mongoose')
var user = new mongoose.Schema({
  id: {type:Number, required: true},
  username: {type:String, trim:true, lowercase:true, default:''},

})

module.exports = mongoose.model('user', user)
