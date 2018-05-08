(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目动态模块相关js] [Project dynamics module related js]
     * @version  3.1.5
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.log', {
                    url: '/log',
                    template: '<home-project-inside-log></home-project-inside-log>'
                });
        }])
        .component('homeProjectInsideLog', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/log/index.html',
            controller: indexController
        })

    indexController.$inject = ['$scope','$rootScope', 'ApiManagementResource', '$state', '$filter', 'CODE'];

    function indexController($scope,$rootScope, ApiManagementResource, $state, $filter, CODE) {
        var vm = this;
        vm.data = {
            info: {
                pagination: {
                    maxSize: 5,
                    logCount: 0
                },
                filter: {
                    dynamics: $filter('translate')('012135'),
                    apiManagement: $filter('translate')('0121421'),
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    page: 1,
                    pageSize: 15
                },
                response: {
                    query: null
                }
            },
            fun: {
                init: null, 
                pageChange:null
            }
        }

        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    page: vm.data.interaction.request.page,
                    pageSize: vm.data.interaction.request.pageSize
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [vm.data.info.filter.dynamics, $state.params.projectName, vm.data.info.filter.apiManagement] });
            template.promise = ApiManagementResource.Project.GetProjectLogList(template.request).$promise;
            template.promise.then(function(response) {
                vm.data.interaction.response.query=response.logList||[];
                vm.data.info.pagination.logCount = response.logCount||0;
            })
            return template.promise;
        }

        /**
         * @function [页面更改功能函数] [Page change function]
         */
        vm.data.fun.pageChange = function() {
            $scope.$broadcast('$LoadingInit');
        }
    }
})();
