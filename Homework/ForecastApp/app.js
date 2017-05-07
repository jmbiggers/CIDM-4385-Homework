angular.module('ForcastApp', ['firebase'])
    .controller("testappController", ['$scope', '$firebaseObject', 'DSWeatherService',
        function($scope, $firebaseObject, DSWeatherService){

            var tac = this;

            tac.selected_city = 
            {
            	
                id: "LA",
                lat: 37.8267,
                lon: -122.4233,
                weather: 
                {
                    temperature: 0,
                    pressure: 0
                }
                /*,
                
            	{
                id: "London",
                lat: 51.528308,
                lon: -0.3817765,
                weather: {
                    temperature: 0,
                    pressure: 0
                }
            	},
                {
                id: "Canyon",
                lat: 34.9812618,
                lon: -101.9147484,
                weather: {
                    temperature: 0,
                    pressure: 0
                },
            }
            */
            };

			tac.selection = tac.selected_city[0];
			
			var ref  = firebase.database().ref();
            //obtain the firebas object so that we can sync changes
            tac.db = $firebaseObject(ref);


             tac.getWeather = function(){

                DSWeatherService.getCurrentConditions(tac.selected_city)
                    .then(function(res){
                        console.log(res.data);
                        tac.selected_city.weather.temperature = res.data.currently.temperature;
                        tac.selected_city.weather.pressure = res.data.currently.pressure;

                        tac.db.latest_temperature = res.data.currently.temperature;
                        tac.db.latest_pressure = res.data.currently.pressure;
                        tac.db.last_accessed = new Date().getTime();


                        tac.db.$save().then(function(){
                            console.log("SAVED");
                        }).catch(function(error){
                            console.log("PROBLEM: " + error);
                        });
                        
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }

            //and call the method above
            tac.getWeather();

        }])

    ///// DARKSKY WEATHER SERVICE FACTORY //////////////////////////////////////////
    .factory('DSWeatherService', ['$sce','$http', function($sce, $http){

        //factory allows us to specify an object to send back
        var dsweatherService = {};
        
        //DarkSky API key
        var key = "d1ced2f35724e97c51d04b6275f5773d";

        //get current rest conditions
        dsweatherService.getCurrentConditions = function(city){

            //for the API
            var url = "https://api.darksky.net/forecast/" +
                    key + "/" + city.lat + "," + city.lon+ "?callback=JSON_CALLBACK";
                    
            console.log(url);

            //var trustedurl = $sce.trustAsResourceUrl(url);
            return $http.jsonp(url);

        };
        
        return dsweatherService;
    }]);