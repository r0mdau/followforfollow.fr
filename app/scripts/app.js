'use strict';

var fffApplication = angular.module('followforfollow', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute'
]).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'fffHomeController'
            }).
            when('/token/:accessToken', {
                templateUrl: 'views/home.html',
                controller: 'fffTokenController'
            }).
            when('/main', {
                templateUrl: 'views/main.html',
                controller: 'fffMainController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);