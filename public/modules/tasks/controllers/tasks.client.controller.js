'use strict';

// Tasks controller
angular.module('tasks').controller('TasksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tasks','Rewards',
	function($scope, $stateParams, $location, Authentication, Tasks, Rewards ) {
		$scope.authentication = Authentication;

		$scope.task = {};
		$scope.tasks = Tasks.query();

		$scope.currentTask = undefined;

		$scope.setCurrentTask = function(task) {
			$scope.currentTask = task;
		};

		// Create new Reward
		$scope.create = function() {
			console.log($scope.task);
			var reward = new Rewards({
				name: $scope.task.reward.rewards
			});
			reward.$save(function(response) {
				var rewardId = response._id;
				// Create new Task object
				var task = new Tasks ({
					name: $scope.task.name,
					description: $scope.task.description,
					reward: {
						rewards: [rewardId]
					},
					owner: $scope.task.owner
				});
				$scope.tasks.push(task);
				// Redirect after save
				task.$save(function(response) {
					$scope.find();
					$scope.flip();
					// add the new task to array
					$scope.$apply(function () {
						// $scope.tasks.push(task);
					});
					// $location.path('tasks/' + response._id);

					// Clear form fields
					$scope.task = {};

				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});

		};

		$scope.editCurrentTask = function() {

		};

		// Remove existing Task
		$scope.remove = function( task ) {
			console.log(task)
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
