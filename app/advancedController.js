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

			$http.get('app/data/charged_moves.json')
				.then(function (res) {
					vm.chargedMoves = res.data;
					vm.chargedAttacksByName = {};

					var chargedMovesLength = vm.chargedMoves.length;

					for(var i = 0; i < chargedMovesLength; i++) {
						vm.chargedAttacksByName[vm.chargedMoves[i].Name] = {};
						vm.chargedAttacksByName[vm.chargedMoves[i].Name].Crit = vm.chargedMoves[i].Crit;
						vm.chargedAttacksByName[vm.chargedMoves[i].Name].Duration = vm.chargedMoves[i].Duration;
						vm.chargedAttacksByName[vm.chargedMoves[i].Name].NRG = vm.chargedMoves[i].NRG;
						vm.chargedAttacksByName[vm.chargedMoves[i].Name].PW = vm.chargedMoves[i].PW;
						vm.chargedAttacksByName[vm.chargedMoves[i].Name].Type = vm.chargedMoves[i].Type;
					}
				});

			$http.get('app/data/basic_moves.json')
				.then(function (res) {
					vm.basicMoves = res.data;
					vm.basicAttacksByName = {};

					var basicMovesLength = vm.basicMoves.length;

					for(var i = 0; i < basicMovesLength; i++) {
						vm.basicAttacksByName[vm.basicMoves[i].Name] = {};
						vm.basicAttacksByName[vm.basicMoves[i].Name].Duration = vm.basicMoves[i].Duration;
						vm.basicAttacksByName[vm.basicMoves[i].Name].NRG = vm.basicMoves[i].NRG;
						vm.basicAttacksByName[vm.basicMoves[i].Name].PW = vm.basicMoves[i].PW;
						vm.basicAttacksByName[vm.basicMoves[i].Name].Type = vm.basicMoves[i].Type;
					}
				});


			$http.get('app/data/species_attacks.json')
				.then(function (res) {
					vm.speciesAttacks = res.data;

					angular.forEach(vm.speciesAttacks, function (value, key) {
						var attackRatio = vm.speciesData[value.ID - 1].AttackRatio + 15;
						var basicAttType = vm.basicAttacksByName[value.Move1].Type;
						var basicDuration = vm.basicAttacksByName[value.Move1].Duration;
						var basicNRG = vm.basicAttacksByName[value.Move1].NRG;
						var basicPW = vm.basicAttacksByName[value.Move1].PW;
						var chargedAttType = vm.chargedAttacksByName[value.Move2].Type;
						var chargedCrit = vm.chargedAttacksByName[value.Move2].Crit;
						var chargedDuration = vm.chargedAttacksByName[value.Move2].Duration;
						var chargedNRG = vm.chargedAttacksByName[value.Move2].NRG;
						var chargedPW = vm.chargedAttacksByName[value.Move2].PW;
						var pokType1 = vm.speciesData[value.ID - 1].Type1;
						var pokType2 = vm.speciesData[value.ID - 1].Type2;

						var basicStab = [pokType1, pokType2].indexOf(basicAttType) !== -1 ? 1 : 0;
						var chargedStab = [pokType1, pokType2].indexOf(chargedAttType) !== -1 ? 1 : 0;

						var basicCycleDamage = (chargedNRG / basicNRG) * (basicPW * (1 + basicStab * 0.25));
						var chargedCycleDamage = chargedPW * (1 + chargedStab * 0.25) * (1 + (0.5 * chargedCrit / 100));
						var noWeave = (basicPW * (1 + (basicStab * 0.25))) * (100000 / basicDuration);
						var weaveCycleDamage = basicCycleDamage + chargedCycleDamage;
						var weaveCycleLength = (chargedNRG / basicNRG) * basicDuration + (chargedDuration + 500);
						var weaveDamage = weaveCycleDamage * (100000 / weaveCycleLength) + (basicPW * (1 + basicStab * 0.25)) * (100000 % weaveCycleLength) / basicDuration;

						vm.speciesAttacks[key].gymOffense = Math.round(Math.max(noWeave, weaveDamage) * attackRatio);

						// console.log(vm.speciesData[value.ID - 1].Name + ' : ' + value.Move1 + ' : ' + attackRatio);

					});
				});
		}
	}
})();
