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
			
			'setFollowersRelationship': function(){
				var promise = null;
				angular.forEach(fffStorage.getFollowers(), function(follower, key) {
					promise = fffInstagram.getRelationship(follower.id).success(function(response){
						var status = 'btn-danger'
						if(response.data.outgoing_status == 'follows')
							status = 'btn-success';
						
						var followers = [];						
						
						angular.forEach(fffStorage.getFollowers(), function(follow, keyf) {
							if(follower.id == follow.id){
								follow.follows = status;
								if(status == 'btn-danger'){
									fffStorage.addYouNotFollowingBack(follow);
								}
							}	
							followers.push(follow);
						});
						fffStorage.setFollowers(followers);
					});
				});
				return promise;
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