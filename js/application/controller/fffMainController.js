'use strict';

fffControllers.controller('fffMainController', ['$scope', '$location', '$http', 'fffInstagram', 'fffStorage',
  function ($scope, $location, $http, fffInstagram, fffStorage) {
    
    $scope.signOut = function(){
        if(fffStorage.getToken() !== 0){
          fffStorage.removeAll();
        }
        $location.path("/home");
    }    
       
    fffInstagram.getUser().success(function(response) {
        $scope.username = response.data.username;
        $scope.bio= response.data.bio;
        $('#profilePicture').html('<img src="' + response.data.profile_picture + '" alt="' + response.data.username + '">');
        fffStorage.setUser(response.data);
    });
  }]);