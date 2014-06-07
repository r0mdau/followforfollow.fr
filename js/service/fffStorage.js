'use strict';


fffControllers.factory('fffStorage', function () {
	var keys = {
	  token : 'token',
	  user : 'user',	
	  followers : 'followers',
	  following : 'following',
	  followersGained : 'followersGained',
	  followersLost : 'followersLost',
	  areNotFollowingBack : 'areNotFollowingBack',
	  youNotFollowingBack : 'youNotFollowingBack'
	}

	return {
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
		
		setYouNotFollowingBack: function (user) {
			localStorage.setItem(keys.youNotFollowingBack, JSON.stringify(user));
		},
		
		clearYouNotFollowingBack: function () {
			localStorage.removeItem(keys.youNotFollowingBack);
		},
		
		getAreNotFollowingBack: function (){
			return JSON.parse(localStorage.getItem(keys.areNotFollowingBack) || '[]');
		},
		
		setAreNotFollowingBack: function (user) {
			localStorage.setItem(keys.areNotFollowingBack, JSON.stringify(user));
		},
		
		clearAreNotFollowingBack: function () {
			localStorage.removeItem(keys.areNotFollowingBack);
		},
		
		removeAll: function () {
			angular.forEach(keys, function(value, key) {
				localStorage.removeItem(value);
			});
		},
		
		removeStats: function () {
			localStorage.removeItem(keys.followers);
			localStorage.removeItem(keys.following);
			localStorage.removeItem(keys.followersGained);
			localStorage.removeItem(keys.followersLost);
			localStorage.removeItem(keys.areNotFollowingBack);
			localStorage.removeItem(keys.youNotFollowingBack);
		}
	};
});