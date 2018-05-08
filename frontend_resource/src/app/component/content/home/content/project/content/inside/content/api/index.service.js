(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api接口相关公用服务js] [api interface related public service js]
     * @version  3.1.5
     * @service  $state [注入作用域服务] [Injection state service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  Cache_CommonService [注入HomeProject_Service服务] [Injection Cache_CommonService service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .service('HomeProjectDefaultApi_Service', index);

    index.$inject = ['$state', '$rootScope', 'ApiManagementResource', 'Cache_CommonService','GroupService' ,'CODE', '$filter']

    function index($state, $rootScope, ApiManagementResource, Cache_CommonService, GroupService ,CODE, $filter) {
        var data = {
            service: {
                detail: Cache_CommonService
            },
            navbar: {
                menu: null, 
                delete: null, 
                recover: null, 
                deleteCompletely: null, 
            }
        }
        /**
         * @function [菜单功能] [Menu function]
         */
        data.navbar.menu = function(status, uri, cache) {
            var template = {
                uri: {
                    groupID: uri.groupID,
                    childGroupID: uri.childGroupID,
                    apiID: uri.apiID
                }
            }
            switch (status) {
                case 'list':
                    {
                        $state.go('home.project.inside.api.list', template.uri);
                        break;
                    }
                case 'detail':
                    {
                        $state.go('home.project.inside.api.detail', template.uri);
                        break;
                    }
                case 'test':
                    {
                        data.service.detail.set(cache);
                        $state.go('home.project.inside.api.test', template.uri);
                        break;
                    }
                case 'mock':
                    {
                        $state.go('home.project.inside.api.mock', template.uri);
                        break;
                    }
                case 'history':
                    {
                        $state.go('home.project.inside.api.history', template.uri);
                        break;
                    }
                case 'edit':
                    {
                        $state.go('home.project.inside.api.edit', template.uri);
                        break;
                    }
                case 'copy':
                    {
                        template.uri.type = 2;
                        $state.go('home.project.inside.api.edit', template.uri);
                        break;
                    }
            }
        }
        /**
         * @function [移入回收站] [Move into the Recycle Bin]
         */
        data.navbar.delete = function(arg) {
            var template = {
                request: {
                    projectID: arg.projectID,
                    apiID: '[' + arg.apiID + ']'
                },
                uri: {
                    groupID: arg.groupID,
                    childGroupID: arg.childGroupID
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100230'), false, $filter('translate')('012100231'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Api.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $state.go('home.project.inside.api.list', template.uri);
                                        $rootScope.InfoModal($filter('translate')('012100232'), 'success');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
        /**
         * @function [恢复功能函数] [Restore function function]
         */
        data.navbar.recover = function(arg) {
            var template = {
                modal: {
                    group: {
                        parent: GroupService.get(),
                        title: $filter('translate')('012100237')
                    }
                },
                request: {
                    projectID: arg.projectID,
                    apiID: '[' + arg.apiID + ']',
                    groupID: ''
                },
                uri: {
                    groupID: arg.groupID,
                    childGroupID: arg.childGroupID
                }
            }
            if (!template.modal.group.parent) {
                $rootScope.InfoModal($filter('translate')('012100238'), 'error');
                return;
            }
            $rootScope.ApiRecoverModal(template.modal, function(callback) {
                if (callback) {
                    template.request.groupID = callback.groupID;
                    ApiManagementResource.Trash.Recover(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100239'), 'success');
                                        $state.go('home.project.inside.api.list', template.uri);
                                        break;
                                    }
                            }
                        })
                }
            });
        }
         /**
         * @function [彻底删除功能函数] [Completely remove the function function]
         */
        data.navbar.deleteCompletely = function(arg) {
            var template = {
                request: {
                    projectID: arg.projectID,
                    apiID: '[' + arg.apiID + ']'
                },
                uri: {
                    groupID: arg.groupID,
                    childGroupID: arg.childGroupID
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100047'), false, $filter('translate')('012100048'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Trash.Delete(template.request).$promise
                        .then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $state.go('home.project.inside.api.list', template.uri);
                                        $rootScope.InfoModal($filter('translate')('012100049'), 'success');
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('012100050') ,'error');
                                        break;
                                    }
                            }
                        })
                }
            });
        }
        return data;
    }
})();
