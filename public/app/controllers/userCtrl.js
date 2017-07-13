angular.module('userControllers', ['userServices'])
.controller('regCtrl', function($http, $location, $timeout, User){

	var app = this;

	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;

		User.create(app.regData).then(function(data){
	//antes era asi, ahora lo hacemos con servicios con create	
	//	$http.post('/api/users',app.regData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.message);
			if(data.data.success){
				app.loading = false;
				//crea un mesage ok
				app.successMsg= data.data.message + '...Redirecting' ;
				//redirec home
				$timeout(function(){
					$location.path('/');	
				}, 2000);
				

			}else{
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
});
