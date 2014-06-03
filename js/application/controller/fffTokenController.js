fffControllers.controller('fffTokenController', ['$scope','$routeParams', '$location', function($scope, $routeParams, $location) {
  if($routeParams.accessToken.length > 0){
    storage.setToken($routeParams.accessToken);
    $location.path( "/main" );
  }
}]);