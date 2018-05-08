var mongoose = require('mongoose')
var User = new mongoose.Schema({
  id: {type:Number, required: true},
  username: {type:String, trim:true, lowercase:true, default:''},
  email: {type:String, trim:true, lowercase:true, required:true, default:''},
  password: {type:String, required:true, default:''},
  timestamp: {type:Date, default:Date.now}
})

ProfileSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		id: this._id
	}
	return summary;
}


module.exports = mongoose.model('User', User)
