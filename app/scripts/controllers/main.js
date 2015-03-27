'use strict';


app.controller('MainController', ['$scope', function ($scope) {
    $scope.crawlFollowers = function(){
        this.showProgressBar = true;
    };
}]);