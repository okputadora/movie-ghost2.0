var mongoose = require('mongoose')
var User = new mongoose.Schema({
  username: {type:String, trim:true, lowercase:true, default:''},
  password: {type:String, required:true, default:''},
  profilePic: {type:String, required:false, default:'blankAvatar.png'},
  savedGames: {type:Array, required:false, default:[]}
})

// never return the password (even though its encrypted)
User.methods.summary = function(){
	var summary = {
		username: this.username,
    id: this._id
  }
	return summary;
}


module.exports = mongoose.model('User', User)
