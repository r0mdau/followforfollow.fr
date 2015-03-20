'use strict';


app.factory('Instagram', ['$http', 'Storage',
    function($http, Storage) {
        var base = APISettings.apiBaseUri;
        var clientId = APISettings.clientId;

        return {
            getUser: function() {
                var request = '/users/self?access_token='+Storage.getToken();
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
                    data : 'id='+ id + '&action='+action+'&token='+Storage.getToken(),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response){
                    callback(response);
                });
            }
        };
    }
]);