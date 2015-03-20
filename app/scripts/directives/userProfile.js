'use strict';

app.directive('userProfile', ['Storage', 'User', function (Storage, User) {
    return {
        restrict: 'E',
        templateUrl: 'views/userProfile.html',
        controllerAs: 'userProfileCtrl',
        controller: function () {
            if(!Storage.hasUser()) {
                this.user = User.getProfile();
            }else{
                this.user = Storage.getUser();
            }
        }
    };
}]);
