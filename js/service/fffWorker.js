'use strict';


fffControllers.factory('fffWorker', ['fffStorage', 'fffInstagram',
	function(fffStorage, fffInstagram) {		
		return {
			'setFollowers': function(userId) {
				return fffInstagram.getFollowers(userId).success(function(response){
					var followers = [];
					angular.forEach(response, function(data, key) {
						angular.forEach(data, function(follower, keyf) {
							if(keyf > 2){
								followers.push(follower);							
							}
						});
					});
					fffStorage.setFollowers(followers);
				});
			},
			
			'setFollowing': function(userId) {
				return fffInstagram.getFollowing(userId).success(function(response){
					var followers = [];
					angular.forEach(response, function(data, key) {
						angular.forEach(data, function(follower, keyf) {
							if(keyf > 2){
								follower.follows = 'btn-success';
								followers.push(follower);
							}
						});
					});
					fffStorage.setFollowing(followers);
				});
			}
		};
	}
]);