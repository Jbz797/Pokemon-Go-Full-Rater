(function () {
	'use strict';

	angular
		.module('app')
		.controller('SpeciesController', SpeciesController);

	SpeciesController.$inject = ['$http'];

	function SpeciesController($http) {

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

					var speciesDataLength = vm.speciesData.length;
					var attackRatioArray = [];
					var defenseRatioArray = [];
					var hpRatioArray = [];
					var maxCPCapArray = [];
					var minCPCapArray = [];

					for(var i = 0; i < speciesDataLength; i++) {
						attackRatioArray.push(vm.speciesData[i].AttackRatio);
						defenseRatioArray.push(vm.speciesData[i].DefenseRatio);
						hpRatioArray.push(vm.speciesData[i].HPRatio);
						maxCPCapArray.push(vm.speciesData[i].MaxCPCap);
						minCPCapArray.push(vm.speciesData[i].MinCPCap);
					}

					vm.attackRatioMax = Math.max.apply(null, attackRatioArray);
					vm.attackRatioMin = Math.min.apply(null, attackRatioArray);
					vm.defenseRatioMax = Math.max.apply(null, defenseRatioArray);
					vm.defenseRatioMin = Math.min.apply(null, defenseRatioArray);
					vm.hpRatioMax = Math.max.apply(null, hpRatioArray);
					vm.hpRatioMin = Math.min.apply(null, hpRatioArray);
					vm.maxCPCapMax = Math.max.apply(null, maxCPCapArray);
					vm.maxCPCapMin = Math.min.apply(null, maxCPCapArray);
					vm.minCPCapMax = Math.max.apply(null, minCPCapArray);
					vm.minCPCapMin = Math.min.apply(null, minCPCapArray);

					vm.attackRatioAvg = average(attackRatioArray);
					vm.defenseRatioAvg = average(defenseRatioArray);
					vm.hpRatioAvg = average(hpRatioArray);
					vm.maxCPCapAvg = average(maxCPCapArray);
					vm.minCPCapAvg = average(minCPCapArray);
				});
		}
	}
})();
