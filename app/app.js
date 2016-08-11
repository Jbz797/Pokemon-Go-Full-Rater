(function () {
	'use strict';

	angular.module('app', ['ngMaterial'])

	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.dark();
	});
})();
