angular.module('App')
.controller('RatesController', function ($scope, $http, $ionicPopover, Currencies) {
  
  var rc = this;
  
  rc.currencies = Currencies;
  rc.rates=[];


  $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.openHelp = function($event) {
    $scope.popover.show($event);
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  rc.load = function () {
    $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {
      angular.forEach($scope.currencies, function (currency) {
        currency.ticker = tickers[currency.code];
        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
      });
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
    // indexDB from Dr.Babb's chapter 5 challenges    

    rc.refreshList = function(){
      indexDBService.getRates().then(function(data){
            
            rc.rates=data;
            
            rc.currencies = rc.rates;
      }, function(err){
        $window.alert(err);
      });
    };
    rc.addRates = function(){
      indexDBService.addRates(rc.currencies).then(function(){
        rc.refreshList();
      
        rc.currencies = rc.rates;
      }, function(err){
        $window.alert(err);
      });
    };
    
    rc.deleteRates = function(id){
      indexDBService.deleteRates(id).then(function(){
        rc.refreshList();
      }, function(err){
        $window.alert(err);
      });
    };
    
    rc.init = function(){
      indexDBService.open().then(function(){
        rc.refreshList();
      });
    }
    
    $interval($scope.loadSchedule, 60*1000);
    
    rc.load();
});
