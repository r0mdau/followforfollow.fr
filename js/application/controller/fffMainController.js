fffControllers.controller('fffMainController', ['$scope', '$location', '$http',
  function ($scope, $location, $http) {
    
    $scope.signOut = function(){
        if(storage.getToken() !== 0){
            storage.removeToken();            
        }
        $location.path("/home");
    }
    $scope.username = '';
    
    $.ajax({
        dataType: "jsonp",
        url: "https://api.instagram.com/v1/users/self?access_token="+storage.getToken(),
        success: function( data ) {
            $scope.$apply(function () {
                $scope.username = data.data.username;
            });
        }
    });    
  }]);