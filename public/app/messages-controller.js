'use strict';

angular.module('octobluDashboard')
	.controller('messagesController', function($scope, meshbluService){
		var ids = [];
		$scope.messages = [];

		function addMessage(message){
			if(message.id && _.contains(ids, message.id)){
				return;
			}
			ids.push(message.id);
			var limit = 10;
			$scope.messages.unshift(message);
			if($scope.messages.length > limit){
				$scope.messages.length = 10;
			}
			$scope.$apply();
		}

		meshbluService.getConnection(function(conn){
			conn.on('message', function(message){
				addMessage(message.payload);
			});
		});
	});