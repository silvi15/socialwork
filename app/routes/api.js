var User = require('../models/users');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";

module.exports = function (router) {
	//localhost:3000/api/users
	//user Registration
	router.post('/users', function(req, res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null ||
			req.body.username == '' ||
			req.body.password == null ||
			req.body.password == '' ||
			req.body.email == null ||
			req.body. email == ''){
			res.json({success: false, message: 'Ensure username, email and password were provider' });
	}else{
		user.save( function(err){
			if(err){
				res.json({ success: false, message: 'username or email already exists' });
			}else {
				
				res.json({ success: true, message:'created new user!' });
			}
		});//usuario creado y guardado
	}//else
});
//Login use r
//http:localhost:3000/api/authenticate
router.post('/authenticate', function(req, res){
	User.findOne({ username: req.body.username }).select('password email username').exec( function(err, user){
		console.log('en api: user-name:' + user.username);
		console.log('en api user-pass:' + user.password);
		if(err) console.log(err);
		if(!user){
			res.json({ success: false, message: 'usuario incorrecto'});
		}else if(user){
			if(req.body.password){
				var validPassword = user.comparePassword(req.body.password);
			}else {
				res.json({ success: false, message: 'no se corresponde el usuario con la contraseña' });
			}if(!validPassword){
			res.json({ success: false, message: 'la contraseña de ese usuario es incorrecta' });
		}else{
			var token =jwt.sign({ username: user.username, email:user.email }, secret, { expiresIn:'24'});
			res.json({success: true, message: ' usuario correcto', toke: token });
			console.log(token);
			//var token = jwt.sign({ username : req.body.username }, jwtClave);
			//res.send(token);
		}//else
	}//else if
});//fin funcion req, res
});//fin post
return router;
}//funcion final