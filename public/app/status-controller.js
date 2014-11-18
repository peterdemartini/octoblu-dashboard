'use strict';

angular.module('octobluDashboard')
	.controller('statusController', function($scope, $interval, $http, meshbluService){
		$scope.meshbluRESTStatus = 'Loading status...';
		$scope.meshbluWSStatus = 'Loading status...';
		function handleResponse(responseData){
			if(responseData && responseData.meshblu === 'online'){
				return 'Online';
			}else{
				return 'Offline';
			}
		}
		$scope.getStatus = function(){
			$http.get('https://meshblu.octoblu.com/status')
				.then(function(response){
					$scope.meshbluRESTStatus = handleResponse(response.data);
				});
		};
		$interval(function(){
			$scope.getStatus();
		}, 60 * 1000);

		meshbluService.getConnection(function(conn, creds){
			$scope.meshbluUUID = creds.uuid;
			conn.status(function(data){
				$scope.meshbluWSStatus = handleResponse(data);
			});
		});

		$scope.getStatus();
	});