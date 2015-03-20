'use strict';

app.controller('TokenController', ['$routeParams', '$location', 'Storage',
    function ($routeParams, $location, Storage) {
        if ($routeParams.accessToken.length > 0) {
            Storage.setToken($routeParams.accessToken);
            $location.path("/main");
        }
    }
]);