'use strict';

app.service('User', ['Instagram', 'Storage', function (Instagram, Storage) {
    this.getProfile = function () {
        var user = this;
        Instagram.getUser(Storage.getToken(), function(response){
            user.id = response.id;
            user.username = response.username;
            user.profile_picture = response.profile_picture;
            user.bio = response.bio;
        });

        return user;
    };

    this.deleteSession = function(){
        Storage.removeAll();
    };
}]);