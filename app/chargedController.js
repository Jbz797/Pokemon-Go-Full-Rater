(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChargedController', ChargedController);

	ChargedController.$inject = ['$http'];

	function ChargedController($http) {

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

			$http.get('app/data/charged_moves.json')
				.then(function (res) {
					vm.chargedMoves = res.data;

					var chargedMovesLength = vm.chargedMoves.length;
					var critArray = [];
					var dodgeWindowArray = [];
					var durationArray = [];
					var nRGArray = [];
					var pwArray = [];

					for(var i = 0; i < chargedMovesLength; i++) {
						critArray.push(Number(vm.chargedMoves[i].Crit));
						dodgeWindowArray.push(vm.chargedMoves[i].DodgeWindow);
						durationArray.push(vm.chargedMoves[i].Duration);
						nRGArray.push(vm.chargedMoves[i].NRG);
						pwArray.push(vm.chargedMoves[i].PW);
					}

					vm.critMax = Math.max.apply(null, critArray);
					vm.critMin = Math.min.apply(null, critArray);
					vm.dodgeWindowMax = Math.max.apply(null, dodgeWindowArray);
					vm.dodgeWindowMin = Math.min.apply(null, dodgeWindowArray);
					vm.durationMax = Math.max.apply(null, durationArray);
					vm.durationMin = Math.min.apply(null, durationArray);
					vm.nRGMax = Math.max.apply(null, nRGArray);
					vm.nRGMin = Math.min.apply(null, nRGArray);
					vm.pwMax = Math.max.apply(null, pwArray);
					vm.pwMin = Math.min.apply(null, pwArray);

					vm.critAvg = average(critArray);
					vm.dodgeWindowAvg = average(dodgeWindowArray);
					vm.durationAvg = average(durationArray);
					vm.nRGAvg = average(nRGArray);
					vm.pwAvg = average(pwArray);
				});
		}
	}
})();
