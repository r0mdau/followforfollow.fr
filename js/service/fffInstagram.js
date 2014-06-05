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
			
			'getFollowers' : function(userId){
				var request = '/users/' + userId +'/follows?access_token='+fffStorage.getToken();
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