angular.module("ForecastApp",[])
	.controller("ForecastController",
		["$scope", "$http", function($scope, $http){
		
		var fc = this;
		
		fc.message = "Hello World";
		
		$http.get('model.json')
		.then(function(response){
			fc.message = response.data;
		})
		
	}])