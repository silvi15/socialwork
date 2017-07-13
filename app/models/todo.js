var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socialwork');

var Todo = mongoose.model('Todo', {
	//title: String
	//username: { type: String, required: true },
	title:     { type: String },
	date:     { type: Date, required: true, default: Date.now }
});
module.exports = Todo;


