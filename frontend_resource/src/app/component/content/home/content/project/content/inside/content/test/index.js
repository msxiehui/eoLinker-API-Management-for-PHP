(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [自动化测试侧边栏组件] [Automated test sidebar components]
     * @version  3.1.7
     */
    angular.module('eolinker')
        .component('homeProjectInsideTest', {
            template: '<div>' +
                '<home-project-inside-test-sidebar power-object="$ctrl.powerObject"></home-project-inside-test-sidebar>' +
                '<header ng-show="$ctrl.data.info.status!=-1">' +
                '<ul> ' +
                '<li class="env-li pull-right" style="margin:9px 5px 9px 0;">' +
                '<env-ams-component env-model="$ctrl.data.service.home.envObject.object.model" env-query-init="$ctrl.data.service.home.envObject.object.fun" env-param="$ctrl.data.service.home.envObject.object.param" total-env="$ctrl.data.service.home.envObject.object.total"></env-ams-component>' +
                '</li></ul>' +
                '</header>' +
                '    <div ui-view>' +
                '    </div>' +
                '</div>',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = ['$scope', '$state', 'HomeProject_Common_Service', 'Cache_CommonService', '$filter'];

    function indexController($scope, $state, HomeProject_Common_Service, Cache_CommonService, $filter) {
        var vm = this;
        vm.data = {
            service: {
                home: HomeProject_Common_Service,
                cache: Cache_CommonService
            },
            info: {
                status: 0,
            },
            fun: {
                init: null //初始化功能函数
            },
            assistantFun: {
                init: null //辅助初始化功能函数
            }
        }
        vm.data.assistantFun.init = function() {
            vm.data.service.home.envObject.fun.resetObject();
            if ((/(default)|(api)/).test($state.current.name)) {
                vm.data.info.status = 0;
            } else {
                vm.data.info.status = -1;
            }
        }
        $scope.$on('$stateChangeSuccess', function() { //路由转换函数，检测是否该显示环境变量
            vm.data.assistantFun.init();
        });
        vm.data.fun.init = (function() {
            vm.data.service.cache.set(null, 'apiList');
            vm.data.service.cache.set(null, 'apiGroup');
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012136')] });
            vm.data.assistantFun.init();
        })()
    }
})();
