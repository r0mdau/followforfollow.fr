'use strict';

app.controller('TokenController', ['$routeParams', '$location', 'fffStorage',
    function ($routeParams, $location, fffStorage) {
        if ($routeParams.accessToken.length > 0) {
            fffStorage.setToken($routeParams.accessToken);
            $location.path("/main");
        }
    }
]);