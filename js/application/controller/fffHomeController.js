'use strict';

fffControllers.controller('fffHomeController', ['$scope', '$location', 'fffStorage',
  function ($scope, $location, fffStorage) {
	$('#loginIgApi').attr({
	  title : "Login to Instagram",
	  href : APISettings.apiUri
	});
	
	if(fffStorage.getToken().length !== 0){
	  $location.path("/main");
	}
  }]);