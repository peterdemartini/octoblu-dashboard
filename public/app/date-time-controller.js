'use strict';

angular.module('octobluDashboard')
	.controller('dateTimeController', function($scope, $interval){
		$scope.currentDate = new Date();

		$interval(function(){
			$scope.currentDate = new Date();
		}, 1000);

	});