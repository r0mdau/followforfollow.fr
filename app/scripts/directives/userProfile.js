'use strict';

app.directive('userProfile', ['$location', 'Storage', 'User', function ($location, Storage, User) {
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

            this.signOut = function(){
                User.deleteSession();
                $location.path('/home');
            };
        }
    };
}]);
