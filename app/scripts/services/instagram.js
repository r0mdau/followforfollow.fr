'use strict';


app.factory('fffInstagram', ['$http', 'fffStorage',
    function($http, fffStorage) {
        var base = APISettings.apiBaseUri;
        var clientId = APISettings.clientId;

        return {
            getUser: function() {
                var request = '/users/self?access_token='+fffStorage.getToken();
                var url = base + request;
                var config = {
                    'params': {
                        'client_id': clientId,
                        'callback': 'JSON_CALLBACK'
                    }
                };
                return $http.jsonp(url, config);
            },

            getFromApi : function(url){
                var config = {
                    'params': {
                        'client_id': clientId,
                        'callback': 'JSON_CALLBACK'
                    }
                };
                return $http.jsonp(url, config);
            },

            modifyRelationShip : function (id, action, callback){
                return $http({
                    method : 'POST',
                    url : 'ajax/modifyRelationship.php',
                    data : 'id='+ id + '&action='+action+'&token='+fffStorage.getToken(),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response){
                    callback(response);
                });
            }
        };
    }
]);