'use strict';


fffControllers.controller('fffMainController', ['$scope', '$location', 'fffInstagram', 'fffStorage',
  function ($scope, $location, fffInstagram, fffStorage) {    
    $scope.signOut = function(){
        fffStorage.removeAll();
        $location.path("/home");
    }    
       
    fffInstagram.getUser().success(function(response) {
        $scope.followersCount = response.data.counts.followed_by;
        $scope.followingsCount = response.data.counts.follows;
        $scope.username = response.data.username;
        $scope.currentUser = response.data;
        $scope.bio= response.data.bio;
        $('#profilePicture').html('<img src="' + response.data.profile_picture + '" alt="' + response.data.username + '">');
        fffStorage.setUser(response.data);
    }).error(function(data, status){
        alert(status);
    });
    
    $scope.users = fffStorage.getFollowers();
    $scope.followers = [];
    $scope.followings = [];
    
    $scope.progressBar = function(pourcent){        
        if(pourcent >= 100){
            setTimeout(function() {
                $('.progress-bar').parent().addClass('hide');
                $('.progress-bar').attr({ style : 'width: 0%'});
            }, 1000);            
        }else{
            $('.progress-bar').attr({ style : 'width:' + pourcent + '%'});
        }
    }
    
    $scope.getFollowers = function(uri){
        fffInstagram.getFromApi(uri).success(function(response){            
            angular.forEach(response.data, function(follower, key) {
                if(follower.id){
                    fffInstagram.getRelationship(follower).success(function(response){
                        follower.follows = 'btn-danger';
                        if(response.data.outgoing_status == 'follows'){
                            follower.follows = 'btn-success';
                        }
                        var tab = [];
                        angular.forEach(fffStorage.getFollowers(), function(user, key) {
                            if(user.id == follower.id)
                                user.follows = follower.follows;
                            tab.push(user);
                        });
                        fffStorage.setFollowers(tab);
                    });
                    $scope.followers.push(follower);
                    $scope.users.push(follower);
                    fffStorage.setFollowers($scope.followers);
                    $scope.followersCounter++;
                    $scope.progressBar(parseInt(($scope.followersCounter / ($scope.followersCount * 2)) * 100));
                }
            });            
        }).then(function(response){
            if(response.data.pagination.next_url){
                $scope.getFollowers(response.data.pagination.next_url);
            }
        });
    }
    
    $scope.getFollowing = function(uri){
        fffInstagram.getFromApi(uri).success(function(response){            
            angular.forEach(response.data, function(follower, key) {
                if(follower.username){
                    follower.follows = 'btn-success';
                    $scope.followings.push(follower);        
                    fffStorage.setFollowing($scope.followings);
                    $scope.followingsCounter++;
                    $scope.progressBar(parseInt(($scope.followingsCounter / ($scope.followingsCount * 2)) * 100) + 50);
                }
            });            
        }).then(function(response){
            if(response.data.pagination.next_url){
                $scope.getFollowing(response.data.pagination.next_url);
            }
        });
    }
    
    $scope.refreshStatsInStorage = function(){
        $('.progress-bar').parent().removeClass('hide');
        $scope.users = [];
        $scope.followers = [];
        $scope.followings = [];
        $scope.followersCounter = 0;
        $scope.followingsCounter = 0;
        
        $scope.getFollowers(APISettings.apiBaseUri + '/users/' + $scope.currentUser.id +'/followed-by?access_token='+fffStorage.getToken());
        $scope.getFollowing(APISettings.apiBaseUri + '/users/' + $scope.currentUser.id +'/follows?access_token='+fffStorage.getToken());
        $scope.setAreNotFollowingBack();
        
        $('#mainContent li').removeClass('active');
        $('#showFollowers').addClass('active');
    }

    
    $scope.showFollowers = function(){
        $scope.users = fffStorage.getFollowers();
    }
    $scope.showFollowing = function(){
        $scope.users = fffStorage.getFollowing();
    }
    $scope.showAreNotFollowingBack = function(){
        if(fffStorage.getAreNotFollowingBack().length == 0)
            $scope.setAreNotFollowingBack();
        else
            $scope.users = fffStorage.getAreNotFollowingBack();
    }
    $scope.showYouNotFollowingBack = function(){
        if(fffStorage.getYouNotFollowingBack().length == 0)
            $scope.setYouNotFollowingBack();
        else
            $scope.users = fffStorage.getYouNotFollowingBack();
    }
    
    $scope.setYouNotFollowingBack = function(){
        $scope.tempUsers = [];
        angular.forEach(fffStorage.getFollowers(), function(follower, key) {
            if(follower.follows == 'btn-danger')
                $scope.tempUsers.push(follower);
        });
        fffStorage.setYouNotFollowingBack($scope.tempUsers);
        $scope.users = $scope.tempUsers;
    };
    
    $scope.setAreNotFollowingBack = function(){
        $('.progress-bar').parent().removeClass('hide');
        $scope.areNotFollowingBackCounter = 0;
        angular.forEach(fffStorage.getFollowing(), function(follower, key) {
            fffInstagram.getRelationship(follower).success(function(response){
                follower.follows = 'btn-success';
                if(response.data.incoming_status != 'followed_by'){
                    fffStorage.addAreNotFollowingBack(follower);
                }
                $scope.areNotFollowingBackCounter++;
               $scope.progressBar(parseInt(($scope.areNotFollowingBackCounter / $scope.followingsCount) * 100));
            });
        });
    };
}]);