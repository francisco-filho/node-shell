angular
    .module('app',[])
    .controller('MainCtrl', MainCtrl)
    .factory('modal', function($rootScope, $controller, $compile, $http, $q){
        return function(options){
            var container = options.container || document.body,
                template = options.template;

            var html = $q.when(template);
            var locals = options.locals || {};
            var scope = $rootScope.$new();
            var element, controller;

            function show(){
                html.then(function(h){
                    attach(h);
                    $(container).append(element);
                });
            }
            function attach(html){
                element = angular.element(html);
                locals.$scope = scope;
                if (locals){
                    for(var o in locals){
                        scope[o] = locals[o];
                    }
                }

                var ctrl = $controller(ModalCtrl, locals);
                scope['vm'] = ctrl;
                ctrl['hide'] = hide;

                $compile(element)(scope);   
            }
            function hide(){
                element.remove();
            }
            return {
                show: show,
                hide: hide,
            }
        } 
    });

function MainCtrl(modal){
    var vm = this,
        close;

    vm.show = function(){
        md = modal({
            container: 'body',
            template: '<div class="modal"> Modal Content {{name}}<button ng-click="vm.close()">Close</button></div>',
            locals: {name: 'Angular Scope'}
        });
        md.show();
    }

    vm.hide = function(){
        md.hide();
    }
}

function ModalCtrl(){
    var vm = this;
    vm.close = function(){
        console.log('closing...')
        vm.hide();
    }
}
