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
    
    $scope.followingCount = 0;
    $scope.followingCounter = 0;
    $scope.areNotFollowingBacks = [];
    
    function progressBar(pourcent){        
        if(pourcent >= 99){
            setTimeout(function() {
                $('.progress-bar').parent().addClass('hide');
                $('.progress-bar').attr({ style : 'width: 0%'})
            }, 2000);            
        }else{
            $('.progress-bar').attr({ style : 'width:' + pourcent + '%'})
        }
    }

    
    $scope.$watch('follower', function() {
        progressBar(parseInt(($scope.followers.length / ($scope.followersCount * 2)) * 100));
        $scope.followers.push($scope.follower);        
        if($scope.followers.length == $scope.followersCount){
            $scope.users = $scope.followers;
            fffStorage.setFollowers($scope.followers);
        }
    });
    
    $scope.$watch('followingCounter', function() {
        progressBar(parseInt(($scope.followingCounter / ($scope.followingCount * 2)) * 100) + 50);        
    });
    
    $scope.$watch('youNotFollowingBack', function() {
        if($scope.youNotFollowingBack === Object($scope.youNotFollowingBack)){
            $scope.youNotFollowingBacks.push($scope.youNotFollowingBack);
            fffStorage.setYouNotFollowingBack($scope.youNotFollowingBacks);
        }        
    });
    
    $scope.$watch('areNotFollowingBack', function() {
        if($scope.areNotFollowingBack === Object($scope.areNotFollowingBack)){
            //progressBar(parseInt(($scope.followers.length / $scope.followersCount * 2) * 100));
            $scope.areNotFollowingBacks.push($scope.areNotFollowingBack);
            fffStorage.setAreNotFollowingBack($scope.areNotFollowingBacks);
        }        
    });
    
    $scope.refreshStatsInStorage = function(){
        $('.progress-bar').parent().removeClass('hide');
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
            $scope.followingCount = fffStorage.getFollowing().length;
            
            angular.forEach(fffStorage.getFollowing(), function(following, key) {
                fffInstagram.getRelationship(following.id).success(function(response){
                    var status = 'btn-success'
                    if(response.data.incoming_status == 'followed_by')
                        status = 'btn-danger';
                    
                    following.follows = status;
                    if(status == 'btn-success'){
                        $scope.areNotFollowingBack = following;
                    }
                    $scope.followingCounter++;
                });
            });
        });
        
        $('#mainContent li').removeClass('active');
        $('#showFollowers').addClass('active');
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
    $scope.showAreNotFollowingBack = function(){
        $scope.users = fffStorage.getAreNotFollowingBack();
    }
  }]);