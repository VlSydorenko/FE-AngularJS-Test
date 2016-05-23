'use strict'
/* Controllers */
var testApp = angular.module('testApp', ['ngRoute']);

/* Config */
testApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
          templateUrl:'template/home.html',
          controller:'testAppCtrl'
        })
        .when('/articles/:articleId', {
          templateUrl:'template/article-detail.html',
          controller:'articleCtrl'
        })
        .otherwise({
          redirectTo: '#/'
        });
  }
]);


testApp.controller('testAppCtrl',[
	'$scope','$http', '$location', '$routeParams', '$filter',
	function($scope, $http, $location, $routeParams, $filter) {
    //  Get data from json file
    $http.get('data/response.json').success(function(data, status, headers, config) {
        $scope.result = data;
        $scope.categories = $scope.result.categories;
        $scope.articles = $scope.result.articles;
    });
    $scope.showCategory = function(){
    	$scope.articleFilter = this.category.id;
    	return $scope.articleFilter
  	};
  	 $scope.setCategory = function(){
    	$scope.articleFilter = '';
    	return $scope.articleFilter
  	}
}]);


testApp.controller('articleCtrl', [
	'$scope','$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams){
	$scope.articleId = $routeParams.articleId;
	$http.get('data/response.json').success(function(data, status, headers, config) {
        $scope.result = data;
        $scope.article = $scope.result.articles[$scope.articleId - 1];
        $scope.articleFilter = $scope.article.category_id;
        console.log($scope.article.category_id)
        return $scope.articleFilter
        showCategory();
    });
	
}])