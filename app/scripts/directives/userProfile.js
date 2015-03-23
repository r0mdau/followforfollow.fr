'use strict';

app.directive('userProfile', ['$location', 'User', function ($location, User) {
    return {
        restrict: 'E',
        templateUrl: 'views/userProfile.html',
        controllerAs: 'userProfileCtrl',
        controller: function () {
            this.user = User.getProfile();

            this.signOut = function(){
                User.deleteSession();
                $location.path('/home');
            };
        }
    };
}]);
