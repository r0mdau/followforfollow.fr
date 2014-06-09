'use strict';


fffControllers.factory('fffInstagram', ['$http', 'fffStorage',
	function($http, fffStorage) {
		var base = APISettings.apiBaseUri;
		var clientId = APISettings.clientId;
		
		return {
			'getUser': function() {
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
			
			'getFromApi' : function(url){
				var config = {
					'params': {
						'client_id': clientId,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config);
			},
			
			'getRelationship' : function(user){
				var request = '/users/' + user.id +'/relationship?access_token='+fffStorage.getToken();
				var url = base + request;
				var config = {
					'params': {
						'client_id': clientId,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config);
			}
		};
	}
]);