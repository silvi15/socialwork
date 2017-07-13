var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var Todo = require('./app/models/todo');
var User = require('./app/models/users');

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/socialwork');

app.use(morgan('dev'));
app.use(bodyParser.json()); //parsea
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

app.get('*', function (req, res) {
  // render out the angular bootstrap page
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//start Server
app.listen(port, function() {
  console.log('Server started on port '+ port)
});


//app.use(express.static('ng'));


/*
app.get('/api/todos', function (req, res, next) {
  Todo.find()
  .exec(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

app.post('/api/todos', function (req, res, next) {
  var todo = new Todo({title: req.body.title});
  todo.save(function (err) {
    if (err) return next(err);
    res.sendStatus(201);
    console.log(`added ${todo.title}`);
  });
});

app.delete('/api/todos/:id', function (req, res, next) {
  Todo.find(req.params.id, function (err, todo) {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

*/

