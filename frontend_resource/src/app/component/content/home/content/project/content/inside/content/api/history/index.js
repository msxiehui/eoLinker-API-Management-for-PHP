(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api版本管理模块相关js] [api history module related js]
     * @version  3.1.5
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  HomeProjectDefaultApi_Service [注入HomeProjectDefaultApi_Service服务] [Injection HomeProjectDefaultApi_Service service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.api.history', {
                    url: '/history?groupID?childGroupID?apiID',
                    template: '<home-project-inside-api-history power-object="$ctrl.powerObject"></home-project-inside-api-history>'
                });
        }])
        .component('homeProjectInsideApiHistory', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/api/history/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = ['$scope', '$rootScope', 'ApiManagementResource', '$state', 'HomeProjectDefaultApi_Service', '$filter', 'CODE'];

    function indexController($scope, $rootScope, ApiManagementResource, $state, HomeProjectDefaultApi_Service, $filter, CODE) {
        var vm = this;
        vm.data = {
            service: {
                default: HomeProjectDefaultApi_Service
            },
            info: {
                apiName: ''
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    apiID: $state.params.apiID
                },
                response: {
                    query: null
                }
            },
            fun: {
                init: null,
                deleteHistory: null, 
                toggleHistory: null, 
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: vm.data.interaction.request.apiID
                }
            }
            $rootScope.global.ajax.HistoryList_Api = ApiManagementResource.Api.HistoryList(template.request);
            $rootScope.global.ajax.HistoryList_Api.$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.query = response.apiHistoryList;
                            break;
                        }
                }
                vm.data.info.apiName = response.apiName;
                $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012100163') + response.apiName, $filter('translate')('012100164'), $state.params.projectName, $filter('translate')('012100165')] });
            })
            return $rootScope.global.ajax.HistoryList_Api.$promise;
        }

        /**
         * @function [删除历史记录] [Delete history]
         */
        vm.data.fun.deleteHistory = function(arg) {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiHistoryID: arg.item.historyID,
                    apiID: arg.item.apiID
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100166'), false, $filter('translate')('012100167'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Api.DeleteHistory(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.query.splice(arg.$index, 1);
                                        $rootScope.InfoModal($filter('translate')('012100168'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100169'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }

        /**
         * @function [切换历史记录] [Switch history]
         */
        vm.data.fun.toggleHistory = function(arg) {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiHistoryID: arg.item.historyID,
                    apiID: arg.item.apiID
                }
            }
            if ($rootScope.global.ajax.toggleHistory_Api) $rootScope.global.ajax.toggleHistory_Api.$cancelRequest();
            $rootScope.global.ajax.toggleHistory_Api = ApiManagementResource.Api.toggleHistory(template.request);
            $rootScope.global.ajax.toggleHistory_Api.$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            for (var i = 0; i < vm.data.interaction.response.query.length; i++) {
                                if (vm.data.interaction.response.query[i].isNow == 1) {
                                    vm.data.interaction.response.query[i].isNow = 0;
                                    break;
                                }
                            }
                            arg.item.isNow = 1;
                            break;
                        }
                }
            })
        }
    }
})();
