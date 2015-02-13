'use strict';


fffApplication.controller('fffMainController', ['$scope', '$location', 'fffInstagram', 'fffStorage', 'fffShared',
  function ($scope, $location, fffInstagram, fffStorage, fffShared) {

      $scope.signOut = function(){
        fffStorage.removeAll();
        fffShared.signedOut = true;
        $location.path("/home");
    };

      if(fffStorage.hasData()){
          $scope.hide = '';
          $('#mainContent > button').html('Refresh');
      }else{
          $scope.hide = 'hide';
      }
       
    fffInstagram.getUser().success(function(response) {
        $scope.followersCount = parseInt(response.data.counts.followed_by);
        $scope.followingCount = parseInt(response.data.counts.follows);
        //For scrollbars
        $scope.total = $scope.followersCount + $scope.followingCount;
        $scope.followersPourcent = parseInt(($scope.followersCount / $scope.total) * 100) + 1;
        $scope.followingPourcent = parseInt(($scope.followingCount / $scope.total) * 100) + 1;
        
        $scope.username = response.data.username;
        $scope.currentUser = response.data;
        $scope.bio= response.data.bio;
        $scope.profilePicture = response.data.profile_picture;
        fffStorage.setUser(response.data);
    }).error(function(data, status){
        console.log(status);
    });
    
    $scope.showUsers = function(){
        $scope.users = fffStorage.getFollowers();
    };
    
    $scope.showUsers();
    
    $scope.progressBar = function(pourcent){
        if(pourcent >= 99){
            setTimeout(function() {
                $scope.doThingsAfterLoading();
            }, 1000);            
        }else{
            $('.progress-bar').attr({ style : 'width:' + pourcent + '%'});
        }
    };

      $scope.doThingsAfterLoading = function(){
          $('.progress-bar').attr({ style : 'width: 0%'}).parent().addClass('hide');
          $('#mainContent > button').html('Refresh');
          $('#mainContent li').removeClass('active');
          $('#tableContent').removeClass('hide');
          $('#showFollowers').addClass('active').parent().removeClass('hide');

          $('body').animate({
              scrollTop:$('#focusOnUsers').offset().top
          }, 'slow');
          setTimeout(function() {
              $('body').stop();
          }, 1000);
      };
    
    $scope.getFollowers = function(uri){
        fffInstagram.getFromApi(uri).success(function(response){            
            angular.forEach(response.data, function(follower, key) {
                if(follower.id){
                    var user = {
                        profile_picture : follower.profile_picture,
                        username : follower.username,
                        full_name : follower.full_name,
                        id : follower.id
                    };
                    $scope.followers.push(user);                    
                    $scope.followersCounter++;
                    $scope.progressBar(parseInt(($scope.followersCounter / ($scope.followersCount * (100 / $scope.followersPourcent))) * 100));
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
    };
    
    $scope.getFollowing = function(uri){
        fffInstagram.getFromApi(uri).success(function(response){            
            angular.forEach(response.data, function(follower, key) {
                if(follower.username){
                    var user = {
                        profile_picture : follower.profile_picture,
                        username : follower.username,
                        full_name : follower.full_name,
                        id : follower.id,
                        follows : 'btn-success'
                    };
                    $scope.following.push(user);
                    $scope.followingCounter++;
                    $scope.progressBar(parseInt(($scope.followingCounter / ($scope.followingCount * (100 / $scope.followingPourcent))) * 100) + $scope.followersPourcent);
                }
            });
            fffStorage.setFollowing($scope.following);
        }).then(function(response){
            if(response.data.pagination.next_url){
                $scope.getFollowing(response.data.pagination.next_url);
            }else{
                $scope.setYouNotFollowingBack();
                $scope.showUsers();
                $scope.setAreNotFollowingBack();
                $scope.progressBar(100);
            }
        });
    };
    
    $scope.setYouNotFollowingBack = function(){
        var users = [];
        var followers = [];
        angular.forEach($scope.followers, function(follower, keyf) {
            var present = false;
            angular.forEach($scope.following, function(following, key) {
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
        $scope.following = [];
        $scope.followersCounter = 0;
        $scope.followingCounter = 0;

        $scope.getFollowers(APISettings.apiBaseUri + '/users/' + $scope.currentUser.id +'/followed-by?access_token='+fffStorage.getToken());
    };
    
    $scope.modifyRelationship = function(id, follows){        
        function changeFollows(data){
            var button = $('#u' + id);
            if(data.code == 200) {
                var cssClass = "btn-danger";
                if(data.action == "follow") cssClass = "btn-success";
                button.removeClass('btn-success').removeClass('btn-danger').addClass(cssClass);
            }else{
                button.popover({
                    content : 'Wait 1 hour',
                    placement : 'left'
                }).popover('show');
            }
        }
        var action = 'follow';
        if(follows == 'btn-success')
            action = 'unfollow';
        fffInstagram.modifyRelationShip(id, action, changeFollows);
    };
    
    $scope.showFollowers = function(){
        $scope.users = fffStorage.getFollowers();
    };
    $scope.showFollowing = function(){
        $scope.users = fffStorage.getFollowing();
    };
    $scope.showAreNotFollowingBack = function(){
        $scope.users = fffStorage.getAreNotFollowingBack();
    };
    $scope.showYouNotFollowingBack = function(){
        $scope.users = fffStorage.getYouNotFollowingBack();
    }
}]);