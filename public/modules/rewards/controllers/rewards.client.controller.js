'use strict';

// Rewards controller
angular.module('rewards').controller('RewardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rewards','Users',
	function($scope, $stateParams, $location, Authentication, Rewards, Users ) {
		$scope.authentication = Authentication;

		$scope.setCurrentReward = function(reward) {
			$scope.currentReward = reward;
		};

		$scope.reward = {};
		$scope.rewards = Rewards.query();

		// Create new Reward
		$scope.create = function() {
			// Create new Reward object
			var reward = new Rewards ({
				name: $scope.reward.name,
				description: $scope.reward.description,
				stars: $scope.reward.stars
			});

			// Redirect after save
			reward.$save(function(response) {
				$location.path('rewards/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Reward
		$scope.remove = function( reward ) {
			if ( reward ) { reward.$remove();

				for (var i in $scope.rewards ) {
					if ($scope.rewards [i] === reward ) {
						$scope.rewards.splice(i, 1);
					}
				}
			} else {
				$scope.reward.$remove(function() {
					$location.path('rewards');
				});
			}
		};

		// Update existing Reward
		$scope.update = function(reward) {
			reward.$update(function() {
				$location.path('rewards/' + reward._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Redeeming an Reward
		$scope.redeem = function( reward ) {
			reward.redeemed = true;
			var user = $scope.authentication.user;
			if (user.starCount >= reward.stars) {
				user.starCount -= reward.stars;
			}
			Users.update({
				starCount: user.starCount
			}, function(data) {
				reward.$update();
			});
		};

		// Find a list of Rewards
		$scope.find = function() {
			$scope.rewards = Rewards.query();
		};

		// Find existing Reward
		$scope.findOne = function() {
			$scope.reward = Rewards.get({
				rewardId: $stateParams.rewardId
			});
		};
	}
]);
