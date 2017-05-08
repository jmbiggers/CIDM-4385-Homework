angular.module('App')
.controller('CurrenciesController', function ($scope, Currencies) {
  
  var cc = this;
  
  cc.currencies = Currencies;
  cc.state = {
    reordering: false
  };

  cc.$on('$stateChangeStart', function () {
    $scope.state.reordering = false;
  });

  cc.move = function(currency, fromIndex, toIndex) {
    cc.currencies.splice(fromIndex, 1);
    cc.currencies.splice(toIndex, 0, currency);
  };
});
