'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

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
});
