(function () {
	'use strict';

	angular
		.module('app')
		.controller('BasicController', BasicController);

	BasicController.$inject = ['$http'];

	/* @ngInject */
	function BasicController($http) {

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

			$http.get('app/data/basic_moves.json')
				.then(function (res) {
					vm.basicMoves = res.data;

					var basicMovesLength = vm.basicMoves.length;
					var dPSArray = [];
					var durationArray = [];
					var nRGArray = [];
					var nRGPSArray = [];
					var pwArray = [];

					for(var i = 0; i < basicMovesLength; i++) {
						dPSArray.push(vm.basicMoves[i].DPS);
						durationArray.push(vm.basicMoves[i].Duration);
						nRGArray.push(vm.basicMoves[i].NRG);
						nRGPSArray.push(vm.basicMoves[i].NRGPS);
						pwArray.push(vm.basicMoves[i].PW);
					}

					vm.dPSMax = Math.max.apply(null, dPSArray);
					vm.dPSMin = Math.min.apply(null, dPSArray);
					vm.durationMax = Math.max.apply(null, durationArray);
					vm.durationMin = Math.min.apply(null, durationArray);
					vm.nRGMax = Math.max.apply(null, nRGArray);
					vm.nRGMin = Math.min.apply(null, nRGArray);
					vm.nRGPSMax = Math.max.apply(null, nRGPSArray);
					vm.nRGPSMin = Math.min.apply(null, nRGPSArray);
					vm.pwMax = Math.max.apply(null, pwArray);
					vm.pwMin = Math.min.apply(null, pwArray);

					vm.durationAvg = average(durationArray);
					vm.pwAvg = average(pwArray);
					vm.dPSAvg = average(dPSArray);
					vm.nRGAvg = average(nRGArray);
					vm.nRGPSAvg = average(nRGPSArray);
				});
		}
	}
})();
