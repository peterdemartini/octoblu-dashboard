'use strict';

angular.module('octobluDashboard')
	.controller('statusController', function($scope, $interval, $http){
		$scope.meshbluStatus = 'Loading status...';
		$scope.getStatus = function(){
			console.log('getting status');
			$http.get('https://meshblu.octoblu.com/status')
				.then(function(response){
					var body = response.data;
					if(body && body.meshblu === 'online'){
						$scope.meshbluStatus = 'Online';
					}else{
						$scope.meshbluStatus = 'Offline';
					}
				});
		};
		$interval(function(){
			$scope.getStatus();
		}, 60 * 1000);

		$scope.getStatus();
	});