(function () {
	'use strict';

	angular
		.module('app', [])
		.controller('Controller', Controller);

	Controller.$inject = ['dependencies'];

	/* @ngInject */
	function Controller(dependencies) {
		var vm = this;

		activate();

		function activate() {
			vm.test = 'TEST';
		}
	}
})();
