'use strict';

fffControllers.controller('fffMainController', ['$scope', '$location', '$http', 'fffStorage',
  function ($scope, $location, $http, fffStorage) {
    
    $scope.signOut = function(){
        if(fffStorage.getToken() !== 0){
          fffStorage.removeAll();
        }
        $location.path("/home");
    }
    $scope.username = '';
    
    $.ajax({
        dataType: "jsonp",
        url: "https://api.instagram.com/v1/users/self?access_token="+fffStorage.getToken(),
        success: function( data ) {
            $scope.$apply(function () {
                $scope.username = data.data.username;
                $scope.bio= data.data.bio;
                $('#profilePicture').html('<img src="' + data.data.profile_picture + '" alt="' + data.data.username + '">');
            });
            fffStorage.setUser(data.data);
        }
    });    
  }]);