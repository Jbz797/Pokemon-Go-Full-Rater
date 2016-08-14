(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChargedController', ChargedController);

	ChargedController.$inject = ['$http'];

	/* @ngInject */
	function ChargedController($http) {

		var vm = this;

		activate();

		function average(table) {
			var sum = table.reduce(function (a, b) {
				return a + b;
			});
			var avg = sum / table.length;
			return Math.round(avg * 10) / 10;
		}

		function activate() {

			$http.get('app/data/charged_moves.json')
				.then(function (res) {
					vm.chargedMoves = res.data;

					var chargedMovesLength = vm.chargedMoves.length;
					var critArray = [];
					var dodgeWindowArray = [];
					var durationArray = [];
					var NRGCostArray = [];
					var pwArray = [];

					for(var i = 0; i < chargedMovesLength; i++) {
						critArray.push(Number(vm.chargedMoves[i].Crit));
						dodgeWindowArray.push(vm.chargedMoves[i].DodgeWindow);
						durationArray.push(vm.chargedMoves[i].Duration);
						NRGCostArray.push(vm.chargedMoves[i].NRGCost);
						pwArray.push(vm.chargedMoves[i].PW);
					}

					vm.critMax = Math.max.apply(null, critArray);
					vm.critMin = Math.min.apply(null, critArray);
					vm.dodgeWindowMax = Math.max.apply(null, dodgeWindowArray);
					vm.dodgeWindowMin = Math.min.apply(null, dodgeWindowArray);
					vm.durationMax = Math.max.apply(null, durationArray);
					vm.durationMin = Math.min.apply(null, durationArray);
					vm.NRGCostMax = Math.max.apply(null, NRGCostArray);
					vm.NRGCostMin = Math.min.apply(null, NRGCostArray);
					vm.pwMax = Math.max.apply(null, pwArray);
					vm.pwMin = Math.min.apply(null, pwArray);

					vm.critAvg = average(critArray);
					vm.dodgeWindowAvg = average(dodgeWindowArray);
					vm.durationAvg = average(durationArray);
					vm.NRGCostAvg = average(NRGCostArray);
					vm.pwAvg = average(pwArray);
				});
		}
	}
})();
