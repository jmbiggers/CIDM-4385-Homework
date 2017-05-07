var pizzaApp = angular.module("PizzaApp", []);

pizzaApp.controller("PizzaController",['$scope', 'LocalStorageService',
								function($scope, LocalStorageService){
	var pc = this;
	
	// Chosen pizzas
	pc.pizzas = [];

	// Topping choices
	pc.toppings_list = [
		{name:""},
		{name:"Pepperoni"},
		{name:"Italian Sausage"},
		{name:"Green Peppers"},
		{name:"Chille Peppers"},
		{name:"Ham"},
		{name:"Bacon"},
		{name:"Mushrooms"},
		{name:"Pineapple"}	
			];
			
	pc.toppings1 = pc.toppings_list[0];
	pc.toppings2 = pc.toppings_list[0];
	pc.toppings3 = pc.toppings_list[0];
	pc.toppings4 = pc.toppings_list[0];
	pc.toppings5 = pc.toppings_list[0];
	
	pc.crust_list = 
	[
		{name:"Hand Tossed"},
		{name:"Pan"},
		{name:"Thin Crust"},
	];
	
	pc.crust = pc.crust_list[0];
	
		pc.sizes =[
		{name: "small", code:"Sm"},
		{name: "medium", code:"Md"},
		{name: "Large", code:"Lg"}
	];
	pc.size = pc.sizes[0];

	
	pc.EditPizza = false;

	pc.remove = function($index){
		pc.pizzas = pc.latestData();
		pc.pizzas.splice($index, 1);
		return LocalStorageService.setData('pizza-storage', angular.toJson(pc.pizzas));
	};
	
	pc.edit = function(item, psize, ccrust, tone, ttwo, tthree, tfour, tfive){
		item.size = psize;
		item.crust = ccrust;
		item.t1 = tone;
		item.t2 = ttwo;
		item.t3 = tthree;
		item.t4 = tfour;
		item.t5 = tfive;
	};
	
	pc.latestData = function(){
		return LocalStorageService.getData('pizza-storage');
	};
	
	pc.update = function(psize, ccrust, tone, ttwo, tthree, tfour, tfive){
			pc.pizzas = pc.latestData();
			if(pc.pizzas == null){
				pc.pizzas = [];
			}
			var pizza = { size: psize, t1: tone, t2: ttwo, t3: tthree, t4: tfour, t5: tfive};
			console.log(angular.toJson(pc.pizzas));
			pc.pizzas.push(pizza);
		return LocalStorageService.setData('pizza-storage', angular.toJson(pc.pizzas))
	};
	
	if(pc.pizzas != null){
		pc.pizzas = pc.latestData();
	}
	else{
		console.log("crikey");
	}
	
}]);

pizzaApp.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key == 'pizza-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});