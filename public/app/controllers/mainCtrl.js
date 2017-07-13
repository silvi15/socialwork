angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $timeout, $location) {
	var app = this;

	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading = false;
				//crea un mesage ok
				app.successMsg= data.data.message + '...Redirecting' ;
				//redirec home
				$timeout(function(){
					$location.path('/about');	
				}, 2000);
			}else{
				app.loading = false;
				app.errorMsg = data.data.message;
			}//else
		});//Auth.login
	};//FIN THIS.DOLOGIN
});
