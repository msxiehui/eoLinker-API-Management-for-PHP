(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [mock模块相关js] [mock module related js]
     * @version  3.2.0
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $sce [注入$sce服务] [Injection $sce service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  HomeProjectDefaultApi_Service [注入HomeProject_Service服务] [Injection HomeProjectDefaultApi_Service service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api.mock', {
                    url: '/mock?groupID?childGroupID?apiID',
                    template: '<home-project-inside-api-mock power-object="$ctrl.powerObject"></home-project-inside-api-mock>'
                });
        }])
        .component('homeProjectInsideApiMock', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/mock/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = ['$scope', '$rootScope', '$sce', 'ApiManagementResource', '$state', 'HomeProjectDefaultApi_Service', '$filter', 'CODE'];

    function indexController($scope, $rootScope, $sce, ApiManagementResource, $state, HomeProjectDefaultApi_Service, $filter, CODE) {
        var vm = this;
        vm.data = {
            service: {
                default: HomeProjectDefaultApi_Service
            },
            info: {
                apiName: '',
                spreed: {
                    list: true,
                    review: true
                },
                filter: {
                    shrink: $filter('translate')('012100010'),
                    open: $filter('translate')('012100011'),
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    apiID: $state.params.apiID
                },
                response: {
                    mockInfo: null
                }
            },
            fun: {
                init: null, 
                filterMock: null, 
            }
        }

        /**
         * @function [过滤mock] [Filter mock]
         */
        vm.data.fun.filterMock = function(arg) {
            if (arg.paramKey == '') {
                return false;
            } else {
                return true;
            }
        }
        
        /**
         * @function [初始化功能函数] [Initialize the function]
         */
        vm.data.fun.init = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: vm.data.interaction.request.apiID
                }
            }
            $rootScope.global.ajax.Mock_Api = ApiManagementResource.Api.Mock(template.request);
            $rootScope.global.ajax.Mock_Api.$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.mockInfo = response;
                            vm.data.interaction.response.mockInfo.mockRule = $filter('paramLevelFilter')(vm.data.interaction.response.mockInfo.mockRule);
                            $scope.$emit('$WindowTitleSet', { list: ['[Mock]' + vm.data.interaction.response.mockInfo.apiName, $filter('translate')('012100164'), $state.params.projectName, $filter('translate')('012100165')] });
                            break;
                        }
                }
            })
            return $rootScope.global.ajax.Mock_Api.$promise;
        }
    }
})();
