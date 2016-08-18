(function () {
	'use strict';

	angular.module('app', ['tableSort', 'ngMaterial'])

	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.dark();
	});
})();
