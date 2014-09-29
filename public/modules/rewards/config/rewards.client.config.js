'use strict';

// Configuring the Articles module
angular.module('rewards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rewards', 'rewards', 'dropdown', '/rewards(/create)?');
		Menus.addSubMenuItem('topbar', 'rewards', 'List Rewards', 'rewards');
		Menus.addSubMenuItem('topbar', 'rewards', 'New Reward', 'rewards/create');
	}
]);