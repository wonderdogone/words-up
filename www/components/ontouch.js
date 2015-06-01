var app = ﻿angular.module("touchpad", [])

app.directive('onTouch', [ '$parse', function($parse) {
  return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var ontouchFn = $parse(attrs.onTouch);
            var params = Array.prototype.slice.call(arguments);
            params = params.splice(1);
            ( 'ontouchstart' in window ) ?
            elm.bind('touchstart', function(evt) {
                scope.$apply(function() {
                    ontouchFn(scope, { $event: evt, $params: params });
                });
            }) :
            elm.bind('click', function(evt){
                    scope.$apply(function() {
                        ontouchFn(scope, { $event: evt, $params: params });
                    });
            });
        }
    };
}]);
