var fffApplication = angular.module('fffApplication', [
  'ngRoute',
  'fffControllers'
]);
 
fffApplication.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partial/home.html',
        controller: 'fffHomeController'
      }).
      when('/token/:accessToken', {
        templateUrl: 'partial/home.html',
        controller: 'fffTokenController'
      }).
      when('/main', {
        templateUrl: 'partial/main.html',
        controller: 'fffMainController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);