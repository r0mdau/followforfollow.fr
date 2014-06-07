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
    $scope.followers = [];
    $scope.follower = '';
    $scope.followersCount = 0;
    
    $scope.youNotFollowingBacks = [];
    
    $scope.$watch('follower', function() {
        $scope.followers.push($scope.follower);        
        if($scope.followers.length == $scope.followersCount){
            $scope.users = $scope.followers;
            fffStorage.setFollowers($scope.followers);
        }
    });
    
    $scope.$watch('youNotFollowingBack', function() {
        if($scope.youNotFollowingBack === Object($scope.youNotFollowingBack)){
            $scope.youNotFollowingBacks.push($scope.youNotFollowingBack);
            fffStorage.setYouNotFollowingBack($scope.youNotFollowingBacks);
        }        
    });    
    
    $scope.refreshStatsInStorage = function(){        
        $scope.followers = [];
        fffStorage.clearYouNotFollowingBack();
        
        fffWorker.setFollowers($scope.currentUser.id).then(function(){
            $scope.followersCount = fffStorage.getFollowers().length;
            
            angular.forEach(fffStorage.getFollowers(), function(follower, key) {
                fffInstagram.getRelationship(follower.id).success(function(response){
                    var status = 'btn-danger'
                    if(response.data.outgoing_status == 'follows')
                        status = 'btn-success';
                    
                    follower.follows = status;
                    $scope.follower = follower;
                    if(status == 'btn-danger'){
                        $scope.youNotFollowingBack = follower;
                    }
                });
            });
        });
        
        fffWorker.setFollowing($scope.currentUser.id).then(function(){
            
        });
    }
    
    $scope.showFollowers = function(){
        $scope.users = fffStorage.getFollowers();
    }
    
    $scope.showFollowing = function(){
        $scope.users = fffStorage.getFollowing();
    }
    $scope.showYouNotFollowingBack = function(){
        $scope.users = fffStorage.getYouNotFollowingBack();
    }
  }]);