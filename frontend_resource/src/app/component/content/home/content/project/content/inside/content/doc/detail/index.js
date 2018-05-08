(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目文档详情相关js] [Project Document Details Related js]
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
                .state('home.project.inside.doc.detail', {
                    url: '/detail?groupID?childGroupID?documentID',
                    template: '<home-project-inside-doc-detail power-object="$ctrl.powerObject"></home-project-inside-doc-detail>',
                    resolve: helper.resolveFor('MARKDOWN_CSS')
                });
        }])
        .component('homeProjectInsideDocDetail', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/doc/detail/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = ['$scope', '$sce', 'ApiManagementResource', '$state', 'CODE', '$rootScope', '$filter'];

    function indexController($scope, $sce, ApiManagementResource, $state, CODE, $rootScope, $filter) {
        var vm = this;
        vm.data = {
            interaction: {
                request: {
                    documentID: $state.params.documentID,
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID
                },
                response: {
                    documentInfo: {}
                }
            },
            fun: {
                init: null, 
                delete: null 
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
                    documentID: vm.data.interaction.request.documentID
                }
            }
            $rootScope.global.ajax.Detail_Doc = ApiManagementResource.Doc.Detail(template.request);
            $rootScope.global.ajax.Detail_Doc.$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012100075') + response.documentInfo.title, $filter('translate')('012100076'), $state.params.projectName, $filter('translate')('012100077')] });
                            response.documentInfo.docNoteHtml = $sce.trustAsHtml($filter('XssFilter')(response.documentInfo.content, {
                                onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
                                    if (/(class)|(id)|(name)/.test(name)) {
                                        return name + '="' + value + '"';
                                    }
                                }
                            }));
                            vm.data.interaction.response.documentInfo = response.documentInfo;
                            break;
                        }
                }
            })
            return $rootScope.global.ajax.Detail_Doc.$promise;
        }
        /**
         * @function [删除功能函数] [delete]
         */
        vm.data.fun.delete = function(arg) {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    documentID: '['+vm.data.interaction.request.documentID+']'
                },
                uri:{ 
                    groupID: vm.data.interaction.request.groupID, 
                    childGroupID:vm.data.interaction.request.childGroupID }
            }
            $rootScope.EnsureModal($filter('translate')('012100078'), false, $filter('translate')('012100079'), {}, function(callback) {
                if (callback) {
                    ApiManagementResource.Doc.Delete(template.request).$promise
                        .then(function(response) {
                            switch(response.statusCode){
                                case CODE.COMMON.SUCCESS:{
                                    $state.go('home.project.inside.doc.list',template.uri);
                                    $rootScope.InfoModal($filter('translate')('012100080'), 'success');
                                    break;
                                }
                            }
                        })
                }
            });
        }
    }
})();
