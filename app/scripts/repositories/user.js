'use strict';

app.service('User', ['Instagram', 'Storage', function (Instagram, Storage) {
    this.getProfile = function () {
        var user = this;

        if(!Storage.hasUser()) {
            Instagram.getUser(Storage.getToken(), function (response) {
                user.setProfile(response);
            });
        }else{
            var tmpUser = Storage.getUser();
            this.setProfile(tmpUser);
        }

        return user;
    };

    this.setProfile = function(user){
        this.id = user.id;
        this.username = user.username;
        this.profile_picture = user.profile_picture;
        this.bio = user.bio;
        Storage.setUser(user);
    };

    this.deleteSession = function () {
        Storage.removeAll();
    };
}]);