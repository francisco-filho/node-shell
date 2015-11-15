(function(){
	'use strict';
	
	angular
	.module('app',[])
	.factory('modal', function($rootScope, $q, $compile){
		
		return function(config){
			
			var _title,
				_content,
				_closed = false,
				scope,
				element;
			
			function title(t){
				_title = t;
				return this;
			}
			function content(c){
				_content = c;
				return this;
			}
			function close(param){
				_closed = param;
				$rootScope.$emit('modal::closed');
				scope.$destroy();
				return this;
			}
			
			function show(){

				scope = $rootScope.$new();
				scope['close'] = close;
				scope['hello'] = 'hello worlds';
				var locals = {}
				locals.$scope = scope;
				
				element = angular.element(_content);	
				
				$compile(element)(scope);
				
				$('body').append(element);
				return $q(function(resolve, reject){
					$rootScope.$on('modal::closed', function(value){
						resolve(_closed)
					});
				});								
			}
			
			return {
				title: title,
				content: content,
				show: show
			}
		}
	})
	.directive('simple', function(){
		return {
			template: '<a href=#>Some Simple Link {{ hello }}</a>'
		}
	})
	.controller('MainCtrl', ['$http', '$q', 'modal','$scope', function($http, $q, modal,$scope){
		var vm = this;
		vm.hello = "Hello World!";
		$scope.close = function(){ console.log('closed by controller')};
		vm.close = $scope.close;
		
		vm.showModal = function(){
			modal()
				.title('no title')
				.content('<div class="modal1"><p>{{hello }} {{scope.hello}}</p>'+
					'<button ng-click="close(\'ok\')">Close me!</button>' +
					'<button ng-click="close(\'cancel\')">Close me! cancel</button></div>')
				.show()
				.then(function(d){
					console.log('resolved', d);				
				});
		}
		
	}]);
	
	
})();