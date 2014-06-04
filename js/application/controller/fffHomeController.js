'use strict';

fffControllers.controller('fffHomeController', ['$scope', '$location',
  function ($scope, $location) {
	$('#loginIgApi').attr({
	  title : "Login to Instagram",
	  href : APISettings.apiUri
	});
  }]);