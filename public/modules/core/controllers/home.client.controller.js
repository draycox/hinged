'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication',
	function($scope, $rootScope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$rootScope.user = $scope.authentication.user;
	}
]).directive('flip', function() {
  return {
    restrict: 'EA',
    scope: {},
		// template: '<div class="task"></div>',
    link: function($scope, $elem, $attrs) {
      /**
       * behaviour for flipping effect.
       */
			console.log($scope, $elem, $attrs);
      $scope.$parent.flip = function() {
        $elem.toggleClass('flipped');
      };

			//
      // if ($attrs.clickToggle) {
      //   $elem.bind('click', flip);
      // }


    }
  };
}).directive('reflip', function() {
	return {
		restrict: 'EA',
		scope: {},
		// template: '<div class="task"></div>',
		link: function($scope, $elem, $attrs) {
			/**
			* behaviour for flipping effect.
			*/
			console.log($scope, $elem, $attrs);
			$scope.$parent.reflip = function() {
				$elem.toggleClass('rotate');
			};

			//
			// if ($attrs.clickToggle) {
			//   $elem.bind('click', flip);
			// }


		}
	};
});
