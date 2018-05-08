(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [生成测试报告组件] [Generate a test report component]
     * @version  3.2.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @params {object} object [显示体] [Display body]
     */
    angular.module('eolinker')
        .component('reportAmsComponent', {
            templateUrl: 'app/component/ams/report/index.html',
            controller: indexController,
            bindings: {
                input: '<',
                status:'@',
                otherObject:'<',
                fun:'&'
            }
        })

    indexController.$inject = ['$scope', '$filter'];

    function indexController($scope, $filter) {
        var vm = this;
        vm.data = {
            info: {
                filter: {
                    noContent: $filter('translate')('706'),
                    noRule: $filter('translate')('7011'),
                }
            },
            fun:{
                filter:null,
                cancel:null
            }
        };
        vm.data.fun.filter=function(arg){
            if (arg.paramKey == '') {
                return false;
            } else {
                return true;
            }
        }
        vm.data.fun.cancel=function(){
            vm.input.show=false;
        }
    }
})();
