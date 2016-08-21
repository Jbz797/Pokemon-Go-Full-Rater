(function () {
	'use strict';

	angular
		.module('app')
		.controller('AdvancedController', AdvancedController);

	AdvancedController.$inject = ['$http'];

	function AdvancedController($http) {

		var vm = this;

		activate();

		function average(table) {
			var sum = table.reduce(function (a, b) {
				return a + b;
			});
			var avg = sum / table.length;
			return Math.round(avg);
		}

		function activate() {

			$http.get('app/data/species_data.json')
				.then(function (res) {
					vm.speciesData = res.data;
				});

			$http.get('app/data/species_attacks.json')
				.then(function (res) {
					vm.speciesAttacks = res.data;
				});
		}
	}
})();
