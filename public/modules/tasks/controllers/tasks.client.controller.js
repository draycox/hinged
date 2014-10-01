'use strict';

// Tasks controller
angular.module('tasks').controller('TasksController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Tasks', 'Users','Rewards',
	function($scope, $http, $stateParams, $location, Authentication, Tasks, Users, Rewards) {
		$scope.authentication = Authentication;

		$scope.task = {};
		$scope.tasks = Tasks.query();
		$scope.currentTask = undefined;
		$scope.setCurrentTask = function(task) {
			$scope.currentTask = task;
		};

		// Create a Task and Reward
		$scope.create = function() {
			var task = new Tasks ({
				name: $scope.task.name,
				description: $scope.task.description,
				stars: $scope.task.stars,
				owner: $scope.task.owner,
				awarded: false
			});
			$scope.tasks.push(task);
			// Redirect after save
			task.$save(function(response) {
				$scope.find();
				$scope.flip();
				// add the new task to array
				// $scope.$apply(function () {
				// 	// $scope.tasks.push(task);
				// });
				// $location.path('tasks/' + response._id);

				// Clear form fields
				$scope.task = {};

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editCurrentTask = function() {

		};

		// Remove existing Task
		$scope.remove = function( task ) {
			console.log(task);
			$scope.currentTask = undefined;
			if ( task ) { task.$remove();

				for (var i in $scope.tasks ) {
					if ($scope.tasks [i] === task ) {
						$scope.tasks.splice(i, 1);
					}
				}
			} else {
				$scope.task.$remove(function() {
					$location.path('tasks');
				});
			}
		};

		// Remove existing Task
		$scope.complete = function( task ) {
			task.awarded = true;
			var user = $scope.authentication.user;
			if (user.starCount) {
				user.starCount += task.stars;
			} else {
				user.starCount = task.stars;
			}
			Users.update({
				starCount: user.starCount
			}, function(data) {
				task.$update();
			});
		};

		// Update existing Task
		$scope.update = function(task) {
			task.$update(function() {
				$location.path('tasks/' + task._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tasks
		$scope.find = function() {
			$scope.tasks = Tasks.query();
		};

		// Find existing Task
		$scope.findOne = function() {
			$scope.task = Tasks.get({
				taskId: $stateParams.id
			});
		};
	}
]);
