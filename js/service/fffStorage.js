'use strict';


fffControllers.factory('fffStorage', function () {
	var tokenKey = "token";
	var userKey = "user";

	return {
		getToken: function () {
			return JSON.parse(localStorage.getItem(tokenKey) || '[]');
		},

		setToken: function (token) {
			localStorage.setItem(tokenKey, JSON.stringify(token));
		},
		
		getUser: function () {
			return JSON.parse(localStorage.getItem(userKey) || '[]');
		},

		setUser: function (user) {
			localStorage.setItem(userKey, JSON.stringify(user));
		},
		
		removeAll: function () {
			localStorage.removeItem(tokenKey);
			localStorage.removeItem(userKey);
		}
	};
});