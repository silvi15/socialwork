angular.module('authServices', [])
.factory('Auth', function($http) {
	//creo el objeto nuevo usuario
	var authFactory = {};

	//user.Create(regData)
	authFactory.login = function(loginData){
		//se crea el usuario en la bd con los datos de logindata
		return $http.post('/api/authenticate', loginData).then(function(data){
			console.log(data.data.token);
			return data;
		});
	}	
	return authFactory; //devuelvo usuario registrado
})
.factory('AuthToken', function(){
	//creo el objeto para asignar el token al usuario q ingreso
	var authTokenFactory = {};
	// al objeto le asignamos el token creado
	authTokenFactory.setToken = function(token){
		$window.localStorage.setItem('token', token);
	}


	//devuelvo usuario autenticado
	return authTokenFactory;
});