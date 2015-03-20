'use strict';

app.service('User', ['Instagram', 'Storage', function (Instagram, Storage) {
    this.getProfile = function () {
        var user = this;
        Instagram.getUser().success(function (response) {
            user.username = response.data.username;
            user.currentUser = response.data;
            user.bio = response.data.bio;
            user.profile_picture = response.data.profile_picture;
            Storage.setUser(user.currentUser);
        });
        return user;
    };

    this.deleteSession = function(){
        Storage.removeAll();
    };
}]);