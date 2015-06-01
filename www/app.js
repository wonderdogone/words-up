'use strict';

var app = angular.module('mainMod', ['ngMaterial', 'ngRoute', 'touchpad']);

app.config(function ($httpProvider, $routeProvider) {
  $httpProvider.useApplyAsync(true);

  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'appCtrl'
  })
  // .when('/combos', {
  //   templateUrl: 'views/comboView.html',
  //   controller: 'startCtrl'
  // })
  .otherwise({  redirectTo: '/home' });
});

app.constant("dataUrl","/api/wordCombinations/");

app.controller('appCtrl', function($scope, $location, $http, dataUrl) {
	$scope.pad = ['7', '8', '9', '4', '5', '6', '2', '3', 'clear'];
	$scope.formula = ['0'];

	$scope.add = function(item) {
        if (item == 'clear') {
            $scope.remove();
        } else {
            (! /[0-9]/.test(item) && ! /[0-9]/.test($scope.formula.slice(-1)[0])) ? $scope.remove() : null;
            ($scope.formula == '0' && /[0-9]/.test(item)) ? $scope.formula = [item] : $scope.formula.push(item);
        }
	};

	$scope.solve = function() {
        return $scope.formula.join('');
	};

	$scope.reset = function() {
		$scope.formula = ['0'];
    $scope.data = {};
	};

    $scope.remove = function() {
        $scope.formula.pop();
        ($scope.formula.length == 0) ? $scope.reset() : null;
    };

    //normally put this in a service
    $scope.showCombo = function (size) {

      $scope.data = {};
      $http.get(dataUrl + $scope.formula.join(''))
      .success(function (data) {
        $scope.data = data;
        console.log(data);

      })
      .error(function (response) {
        $scope.data.error = response.error || response;
      });

    };

});
