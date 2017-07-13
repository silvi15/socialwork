var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socialwork');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true },
	password: { type: String, lowercase: true, required: true },
	email: { type: String, lowercase: true, required: true, unique: true }
});
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash) {
	if(err) return next(err);
	user.password = hash;
	next();
	});
});
//comparar las contraseñas

UserSchema.methods.comparePassword = function(password){
    console.log('password' + password);
    console.log('this.password' + this.password);
	var comparar = bcrypt.compareSync(password, this.password);
    console.log('comparar' + comparar);
    return true;
};

module.exports = mongoose.model('User', UserSchema);
