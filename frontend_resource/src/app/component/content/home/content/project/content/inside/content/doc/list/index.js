(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目文档列表相关js] [Project Document List Related js]
     * @version  3.1.6
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  $sce [注入$sce服务] [Injection $sce service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.doc.list', {
                    url: '/list?groupID?childGroupID?search',
                    template: '<home-project-inside-doc-list power-object="$ctrl.powerObject"></home-project-inside-doc-list>'
                });
        }])
        .component('homeProjectInsideDocList', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/doc/list/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = ['$scope', 'ApiManagementResource', '$state', 'CODE', '$rootScope', 'GroupService', '$filter'];

    function indexController($scope, ApiManagementResource, $state, CODE, $rootScope, GroupService, $filter) {
        var vm = this;
        vm.data = {
            info: {
                batch: {
                    address: [],
                    disable: false
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID,
                    tips: $state.params.search,
                    documentID: []
                },
                response: {
                    query: null
                }
            },
            fun: {
                init: null, 
                search: null, 
                edit: null, 
                delete: null, 
                enter: null, 
                batch: {
                    delete: null, 
                    default: null,
                    sort: null, 
                }
            }
        }
        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    groupID: vm.data.interaction.request.childGroupID || vm.data.interaction.request.groupID,
                    tips: vm.data.interaction.request.tips
                }
            }
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('0121000100'), $state.params.projectName, $filter('translate')('012100077')] });
            if (template.request.tips) {
                $rootScope.global.ajax.Query_Doc = ApiManagementResource.Doc.Search(template.request);
                $rootScope.global.ajax.Query_Doc.$promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.documentList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                                break;
                            }
                    }
                })
            } else if (template.request.groupID == -1) {
                $rootScope.global.ajax.Query_Doc = ApiManagementResource.Doc.All(template.request);
                $rootScope.global.ajax.Query_Doc.$promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.documentList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                                break;
                            }
                    }
                })
            } else {
                $rootScope.global.ajax.Query_Doc = ApiManagementResource.Doc.Query(template.request);
                $rootScope.global.ajax.Query_Doc.$promise.then(function(response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS:
                            {
                                vm.data.interaction.response.query = response.documentList;
                                break;
                            }
                        default:
                            {
                                vm.data.interaction.response.query = [];
                                break;
                            }
                    }
                })
            }
            return $rootScope.global.ajax.Query_Doc.$promise;
        }
        /**
         * @function [搜索功能函数] [search]
         */
        vm.data.fun.search = function() {
            if ($scope.searchForm.$valid) {
                $state.go('home.project.inside.doc.list', { search: vm.data.interaction.request.tips });
            }
        }
        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.fun.edit = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                cache: GroupService.get()
            }
            if ((!template.cache) || (template.cache.length == 0)) {
                $rootScope.InfoModal($filter('translate')('012100229'), 'error');
            } else {
                if (!arg.item) {
                    $state.go('home.project.inside.doc.edit', { groupID: vm.data.interaction.request.groupID, childGroupID: vm.data.interaction.request.childGroupID });
                } else {
                    $state.go('home.project.inside.doc.edit', { groupID: vm.data.interaction.request.groupID, childGroupID: vm.data.interaction.request.childGroupID, documentID: arg.item.documentID })
                }
            }
        }
        /**
         * @function [删除功能函数] [delete]
         */
        vm.data.fun.delete = function(arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    documentID: '[' + arg.item.documentID + ']'
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100078'), false, $filter('translate')('012100079'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Doc.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        vm.data.interaction.response.query.splice(arg.$index, 1);
                                        $rootScope.InfoModal($filter('translate')('012100080'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('0121000101'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
        /**
         * @function [进入项目功能函数] [Enter the project function]
         */
        vm.data.fun.enter = function(arg) {
            var template = {
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    documentID: arg.item.documentID
                },
                $index: vm.data.interaction.request.documentID.indexOf(arg.item.documentID)
            }
            if (vm.data.info.batch.disable) {
                arg.item.isClick = !arg.item.isClick;
                if (arg.item.isClick) {
                    vm.data.interaction.request.documentID.push(arg.item.documentID);
                    vm.data.info.batch.address.push(arg.$index);
                } else {
                    vm.data.interaction.request.documentID.splice(template.$index, 1);
                    vm.data.info.batch.address.splice(template.$index, 1);
                }
            } else {
                $state.go('home.project.inside.doc.detail', template.uri);
            }
        }
        /**
         * @function [批量操作默认功能函数] [Batch operation default function]
         */
        vm.data.fun.batch.default = function() {
            if (vm.data.interaction.response.query && vm.data.interaction.response.query.length > 0) {
                vm.data.info.batch.disable = true;
                angular.forEach(vm.data.info.batch.address, function(val, key) {
                    vm.data.interaction.response.query[val].isClick = false;
                })
                vm.data.info.batch.address = [];
                vm.data.interaction.request.documentID = [];
                $rootScope.InfoModal($filter('translate')('012100243'), 'success');
            } else {
                $rootScope.InfoModal($filter('translate')('012100244'), 'error');
            }
        }
        /**
         * @function [存储位置排序] [Sort storage location]
         */
        vm.data.fun.batch.sort = function(pre, next) {
            return pre - next;
        }
        /**
         * @function [批量删除功能函数] [Batch delete function]
         */
        vm.data.fun.batch.delete = function() {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    documentID: JSON.stringify(vm.data.interaction.request.documentID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.EnsureModal($filter('translate')('0121000102'), false, $filter('translate')('0121000103'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Doc.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function(val, key) {
                                            val = val - template.loop.num++;
                                            vm.data.interaction.response.query.splice(val, 1);
                                        })
                                        vm.data.info.batch.disable = false;
                                        vm.data.interaction.request.documentID = [];
                                        vm.data.info.batch.address = [];
                                        $rootScope.InfoModal($filter('translate')('012100080'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('0121000101'), 'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
    }
})();
