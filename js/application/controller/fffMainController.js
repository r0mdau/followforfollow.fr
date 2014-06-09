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
    
    $scope.showUsers = function(){
        $scope.users = fffStorage.getFollowers();
    }
    
    $scope.showUsers();
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
                    $scope.followers.push(follower);                    
                    $scope.followersCounter++;
                    $scope.progressBar(parseInt(($scope.followersCounter / ($scope.followersCount * 2)) * 100));
                }                
            });
            fffStorage.setFollowers($scope.followers);
        }).then(function(response){
            if(response.data.pagination.next_url){
                $scope.getFollowers(response.data.pagination.next_url);
            }else{
                $scope.getFollowing(APISettings.apiBaseUri + '/users/' + $scope.currentUser.id +'/follows?access_token='+fffStorage.getToken());
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
            }else{
                $scope.setYouNotFollowingBack();
                $scope.showUsers();
                $scope.setAreNotFollowingBack();
            }
        });
    }
    
    $scope.setYouNotFollowingBack = function(){
        var users = [];
        var followers = [];
        angular.forEach(fffStorage.getFollowers(), function(follower, keyf) {
            var present = false;
            angular.forEach(fffStorage.getFollowing(), function(following, key) {
                if(follower.id == following.id)
                    present = true;
            });
            if(!present){
                follower.follows = 'btn-danger';
                users.push(follower);
            }else{
                follower.follows = 'btn-success';
            }
            followers.push(follower);
        });
        fffStorage.setFollowers(followers);
        fffStorage.setYouNotFollowingBack(users);        
    };
    
    $scope.setAreNotFollowingBack = function(){
        var users = [];
        angular.forEach(fffStorage.getFollowing(), function(following, keyf) {
            var present = false;
            angular.forEach(fffStorage.getFollowers(), function(follower, key) {
                if(follower.id === following.id)
                    present = true;
            });
            if(!present)
                users.push(following);
        });
        fffStorage.setAreNotFollowingBack(users);
    };
    
    $scope.refreshStatsInStorage = function(){
        $('.progress-bar').parent().removeClass('hide');
        $scope.users = [];
        $scope.followers = [];
        $scope.followings = [];
        $scope.followersCounter = 0;
        $scope.followingsCounter = 0;
        
        $scope.getFollowers(APISettings.apiBaseUri + '/users/' + $scope.currentUser.id +'/followed-by?access_token='+fffStorage.getToken());
        
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
        $scope.users = fffStorage.getAreNotFollowingBack();
    }
    $scope.showYouNotFollowingBack = function(){
        $scope.users = fffStorage.getYouNotFollowingBack();
    }
}]);