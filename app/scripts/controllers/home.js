'use strict';

app.controller('HomeController', ['$window', '$scope', function ($window, $scope) {
    $scope.login = function(){
        $window.location.href = APISettings.apiUri;
    };
}]);