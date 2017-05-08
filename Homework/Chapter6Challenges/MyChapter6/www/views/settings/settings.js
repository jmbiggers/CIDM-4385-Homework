angular.module('App')
.controller('SettingsController', function ($scope, Settings, Locations) {
  $scope.settings = Settings;
  $scope.locations = Locations.data;
  $scope.canDelete = false;

  $scope.remove = function (index) {
    Locations.toggle(Locations.data[index]);
    
  $scope.move = function(locations, fromIndex, toIndex){
    $scope.locations.splice(fromIndex, 1);
    $scope.locations.splice(toIndex, 0, location);
  };
  };
});
