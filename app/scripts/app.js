'use strict';

var app = angular.module('followforfollow', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            when('/token/:accessToken', {
                templateUrl: 'views/home.html',
                controller: 'TokenController'
            }).
            when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);