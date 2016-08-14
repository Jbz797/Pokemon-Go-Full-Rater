(function () {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$http', '$mdDialog'];

	/* @ngInject */
	function MainController($http, $mdDialog) {

		var vm = this;

		activate();

		function activate() {
			$http.get('app/data/charged_moves.json')
				.then(function (res) {
					vm.chargedMoves = res.data;

					var chargedMovesLength = vm.chargedMoves.length;
					var critArray = [];
					var dodgeWindowArray = [];
					var durationArray = [];
					var healScalarArray = [];
					var NRGCostArray = [];
					var pwArray = [];
					var staminaLossScalarArray = [];

					for(var i = 0; i < chargedMovesLength; i++) {
						critArray.push(vm.chargedMoves[i].Crit);
						dodgeWindowArray.push(vm.chargedMoves[i].DodgeWindow);
						durationArray.push(vm.chargedMoves[i].Duration);
						healScalarArray.push(vm.chargedMoves[i].HealScalar);
						NRGCostArray.push(vm.chargedMoves[i].NRGCost);
						pwArray.push(vm.chargedMoves[i].PW);
						staminaLossScalarArray.push(vm.chargedMoves[i].StaminaLossScalar);
					}

					vm.critMax = Math.max.apply(null, critArray);
					vm.critMin = Math.min.apply(null, critArray);
					vm.dodgeWindowMax = Math.max.apply(null, dodgeWindowArray);
					vm.dodgeWindowMin = Math.min.apply(null, dodgeWindowArray);
					vm.durationMax = Math.max.apply(null, durationArray);
					vm.durationMin = Math.min.apply(null, durationArray);
					vm.healScalarMax = Math.max.apply(null, healScalarArray);
					vm.healScalarMin = Math.min.apply(null, healScalarArray);
					vm.NRGCostMax = Math.max.apply(null, NRGCostArray);
					vm.NRGCostMin = Math.min.apply(null, NRGCostArray);
					vm.pwMax = Math.max.apply(null, pwArray);
					vm.pwMin = Math.min.apply(null, pwArray);
					vm.staminaLossScalarMax = Math.max.apply(null, staminaLossScalarArray);
					vm.staminaLossScalarMin = Math.min.apply(null, staminaLossScalarArray);
				});
		}
	}
})();
