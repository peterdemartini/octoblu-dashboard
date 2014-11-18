'use strict';

angular.module('octobluDashboard')
	.controller('messagesController', function($scope){
		$scope.messages = [{
			title : 'Hello Message',
			body : 'Hello Message Body'
		}];
	});