'use strict';

fffControllers.controller('fffMainController', ['$scope', '$location', 'fffInstagram', 'fffStorage',
  function ($scope, $location, fffInstagram, fffStorage) {
    
    $scope.signOut = function(){
        fffStorage.removeAll();
        $location.path("/home");
    }    
       
    fffInstagram.getUser().success(function(response) {
        $scope.username = response.data.username;
        $scope.bio= response.data.bio;
        $('#profilePicture').html('<img src="' + response.data.profile_picture + '" alt="' + response.data.username + '">');
        fffStorage.setUser(response.data);
    });
  }]);