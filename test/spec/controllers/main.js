describe('MainController', function() {
    beforeEach(module('followforfollow'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    it('should be no progress bar on screen', function(){
        var $scope = {};
        var controller = $controller('MainController', { $scope: $scope });
        expect($scope.showProgressBar).toBeUndefined();
    });

    it('should show a progress bar by setting showProgressBar to true', function() {
        var $scope = {};
        var controller = $controller('MainController', { $scope: $scope });
        $scope.crawlFollowers();
        expect($scope.showProgressBar).toBeTruthy();
    });
});