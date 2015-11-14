(function(){
	'use strict';
	
	angular
	.module('app',[])
	.controller('MainCtrl', ['$http', '$q', function($http, $q){
		var vm = this;
		vm.hello = "Hello World!";
		
	}]);
	
	
})();