(function () {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$http'];

	/* @ngInject */
	function MainController($http) {

		var vm = this;

		activate();

		function activate() {
			$http.get('app/data/charged_moves.json')
				.then(function (res) {
					vm.chargedMoves = res.data;
				});
			vm.test = 'TEST';
		}
	}
})();
