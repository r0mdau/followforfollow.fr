'use strict';

fffControllers.controller('fffTokenController', ['$scope','$routeParams', '$location', 'fffStorage',
    function($scope, $routeParams, $location, fffStorage) {
        if($routeParams.accessToken.length > 0){
          fffStorage.setToken($routeParams.accessToken);
          $location.path( "/main" );
        }
}]);