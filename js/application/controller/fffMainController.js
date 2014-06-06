'use strict';


fffControllers.controller('fffMainController', ['$scope', '$location', 'fffInstagram', 'fffStorage', 'fffWorker',
  function ($scope, $location, fffInstagram, fffStorage, fffWorker) {    
    $scope.signOut = function(){
        fffStorage.removeAll();
        $location.path("/home");
    }    
       
    fffInstagram.getUser().success(function(response) {
        $scope.username = response.data.username;
        $scope.currentUser = response.data;
        $scope.bio= response.data.bio;
        $('#profilePicture').html('<img src="' + response.data.profile_picture + '" alt="' + response.data.username + '">');
        fffStorage.setUser(response.data);
    });
    
    $scope.users = fffStorage.getFollowers();
    
    $scope.refreshStatsInStorage = function(){
        fffWorker.setFollowers($scope.currentUser.id).then(function(){
            $scope.users = fffStorage.getFollowers();
        });
        fffWorker.setFollowing($scope.currentUser.id);
    }
    
    $scope.showFollowers = function(){
        $scope.users = fffStorage.getFollowers();
    }
    
    $scope.showFollowing = function(){
        $scope.users = fffStorage.getFollowing();
    }
  }]);