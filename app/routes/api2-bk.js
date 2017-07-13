  var User = require('../models/users');
  module.exports= function(router) {
      //localhost:3000/api/users
    //USER REGISTRATION
    router.post('/users', function(req, res){
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
       res.json({ success: false, message: 'Ensure username, email and password were provider'  });
     }else{
       user.save(function(err){
         if(err){
          res.json({ success: false, message: 'username or email already exists!'  });

        }else{
          res.json({ success: true, message: 'created new user :D' });
        }
             }); //new user created
     }
   });

//LOGIN USER
//http:localhost:3000/api/authenticate
router.post('/authenticate', function(req, res){                                               
  User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user){
    console.log(user.username);
    console.log(user.password);
    if(err) console.log(err); 
    if(!user){
      res.json({ success: false, message: 'usuario incorrecto' });      
    }else if(user){
      if(req.body.password){
        var validPassword = user.comparePassword(req.body.password);
      }
      else{
        res.json({ success: false, message: 'contraseña incorrecta' });
      }if(!validPassword){
        res.json({ success: false, message: 'no se corresponde la contraseña con el usuario' });
      }else{
        res.json({ success: true, message: 'usuario correcto!' });
      }//else usuario correcto
    }//if contraseña invalida
  });//fin findOne
});//fin

return router;
}//funcion final
