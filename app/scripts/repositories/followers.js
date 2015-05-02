'use strict';

app.service('Followers', ['Instagram', 'Storage', function (Instagram, Storage) {
    this.followers = [];
    this.followersCounter = 0;

    this.following = [];
    this.followingCounter = 0;

    this.getFollowers = function (url) {
        var Followers = this;

        Instagram.getFromApi(Storage.getToken(), url, function (response) {
            angular.forEach(response.data, function (follower, key) {
                if (follower.id) {
                    Followers.followers.push({
                        profile_picture: follower.profile_picture,
                        username: follower.username,
                        full_name: follower.full_name,
                        id: follower.id
                    });
                    Followers.followersCounter++;
                }
            });
            if (response.pagination && response.pagination.next_url) {
                Followers.getFollowers(response.pagination.next_url);
            } else {
                Storage.setFollowers(Followers.followers);
            }
        });
    };

    this.getFollowing = function (url) {
        var Followers = this;
        Instagram.getFromApi(Storage.getToken(), url, function (response) {
            angular.forEach(response.data, function (following, key) {
                if (following.id) {
                    Followers.following.push({
                        profile_picture: following.profile_picture,
                        username: following.username,
                        full_name: following.full_name,
                        id: following.id
                    });
                    Followers.followingCounter++;
                }
            });
            if (response.pagination && response.pagination.next_url) {
                Followers.getFollowing(response.pagination.next_url);
            } else {
                Storage.setFollowing(Followers.following);
            }
        });
    };
}]);