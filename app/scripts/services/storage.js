'use strict';


app.factory('Storage', function () {
	var keys = {
	  token : 'token',
	  user : 'user',	
	  followers : 'followers',
	  following : 'following',
	  areNotFollowingBack : 'areNotFollowingBack',
	  youNotFollowingBack : 'youNotFollowingBack'
	};

	return {
		hasUser: function (){
			return localStorage.getItem(keys.user) !== null;
		},

		getToken: function () {
			return JSON.parse(localStorage.getItem(keys.token) || '[]');
		},

		setToken: function (token) {
			localStorage.setItem(keys.token, JSON.stringify(token));
		},
		
		getUser: function () {
			return JSON.parse(localStorage.getItem(keys.user) || '[]');
		},

		setUser: function (user) {
			localStorage.setItem(keys.user, JSON.stringify(user));
		},
		
		getFollowers: function () {
			return JSON.parse(localStorage.getItem(keys.followers) || '[]');
		},

		setFollowers: function (followers) {
			localStorage.setItem(keys.followers, JSON.stringify(followers));
		},
		
		getFollowing: function () {
			return JSON.parse(localStorage.getItem(keys.following) || '[]');
		},

		setFollowing: function (following) {
			localStorage.setItem(keys.following, JSON.stringify(following));
		},
		
		getYouNotFollowingBack: function (){
			return JSON.parse(localStorage.getItem(keys.youNotFollowingBack) || '[]');
		},
		
		setYouNotFollowingBack: function (users) {
			localStorage.setItem(keys.youNotFollowingBack, JSON.stringify(users));
		},
		
		getAreNotFollowingBack: function (){
			return JSON.parse(localStorage.getItem(keys.areNotFollowingBack) || '[]');
		},
		
		setAreNotFollowingBack: function (users) {
			localStorage.setItem(keys.areNotFollowingBack, JSON.stringify(users));
		},
		
		removeAll: function () {
			angular.forEach(keys, function(value, key) {
				localStorage.removeItem(value);
			});
		}
	};
});