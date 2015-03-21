'use strict';


app.factory('Instagram', ['$http', function ($http) {
    var apiBaseUri = APISettings.apiBaseUri;
    var clientId = APISettings.clientId;

    return {
        getUser: function (token, callback) {
            var url = apiBaseUri + '/users/self?access_token=' + token;
            var config = {
                'params': {
                    'client_id': clientId,
                    'callback': 'JSON_CALLBACK'
                }
            };

            $http.jsonp(url, config).success(function (response) {
                callback(response.data);
            });
        }
    };
}]);