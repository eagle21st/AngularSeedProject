/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
"use strict";

var app = angular.module('app', [
	'ngRoute',
	'mm.foundation',
	'templates-dist',
	'app.services',
	'app.factories',
	'app.filters',
	'app.directives',
	'app.controllers'
]).config(['$interpolateProvider', function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
}]).config(['$routeProvider', function($routeProvider) {
	// var stateResolve = {
	// 	auth: ['AuthService', function (AuthService) {
	// 		return AuthService.isAuthenticated();
	// 	}],
	// 	optin: ['OptinService', function (OptinService) {
	// 		return OptinService.isAuthorized();
	// 	}]
	// };

	$routeProvider.when('/', {
		templateUrl: 'view1.html',
		controller: 'View1Controller',
	}).when('/view2', {
		templateUrl: 'view2.html',
		controller: 'View2Controller'
	}).otherwise({redirectTo: '/'});

}]).run(function($rootScope, $log) {
	$rootScope.$on('$routeChangeError', function (e, curr, prev) {
        $log.log('ROUTECHANGEERROR');
    });
});