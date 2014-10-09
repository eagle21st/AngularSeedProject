/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
"use strict";

angular.module("app.controllers", []).controller("View1Controller", function($scope, $timeout) {
    $scope.hello = 'world';
}).controller("View2Controller", function($scope, $timeout) {
    $scope.hello = 'world2';
});
