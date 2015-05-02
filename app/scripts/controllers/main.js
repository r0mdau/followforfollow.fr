'use strict';


app.controller('MainController', ['$scope', 'User', 'Followers', function ($scope, User, Followers) {
    $scope.crawlFollowers = function(){
        this.showProgressBar = true;
        this.followers = Followers.getFollowers(APISettings.apiBaseUri + '/users/' + User.id +'/followed-by');
        this.following = Followers.getFollowing(APISettings.apiBaseUri + '/users/' + User.id +'/follows');
    };
}]);