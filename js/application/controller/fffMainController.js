fffControllers.controller('fffMainController', ['$scope', '$location',
  function ($scope, $location) {
    
    $scope.signOut = function(){
        if(storage.getToken() !== 0){
            storage.removeToken();            
        }
        $location.path("/home");
    }
  }]);