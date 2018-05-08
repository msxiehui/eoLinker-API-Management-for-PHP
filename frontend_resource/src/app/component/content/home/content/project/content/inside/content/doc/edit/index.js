(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目文档编辑相关js] [Project Document Edit Related js]
     * @version  3.1.6
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.doc.edit', {
                    url: '/edit?groupID?childGroupID?documentID?type',
                    template: '<home-project-inside-doc-edit></home-project-inside-doc-edit>',
                    resolve: helper.resolveFor('JQUERY', 'WANG_EDITOR', 'MARKDOWN','QINIU_UPLOAD')
                });
        }])
        .component('homeProjectInsideDocEdit', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/doc/edit/index.html',
            controller: homeProjectInsideDocEditController
        })

    homeProjectInsideDocEditController.$inject = ['$scope', 'ApiManagementResource', '$state', 'CODE', '$rootScope', 'GroupService', '$filter','HTML_LAZYLOAD'];

    function homeProjectInsideDocEditController($scope, ApiManagementResource, $state, CODE, $rootScope, GroupService, $filter,HTML_LAZYLOAD) {
        var vm = this;
        var code = CODE.COMMON.SUCCESS;
        vm.data = {
            constant: {
                lazyload: HTML_LAZYLOAD[1]
            },
            info: {
                input: {
                    disable: false,
                    submited: false
                },
                group: {
                    parent: [],
                    child: []
                },
                reset: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    documentID: $state.params.documentID,
                    type: $state.params.type
                }
            },
            interaction: {
                response: {
                    docInfo: {
                        projectID: $state.params.projectID,
                        groupID: $state.params.groupID,
                        childGroupID: $state.params.childGroupID,
                        documentID: $state.params.documentID,
                        title: '',
                        docRichNote: '',
                        docMarkdownNote: '',
                        contentRaw: '',
                        contentType: '0'
                    }
                }
            },
            fun: {
                init: null, 
                load: null, 
                requestProcessing: null, 
                menu: null, 
                change: {
                    group: null, 
                    noteType: null, 
                },
                back: null, 
            },
            assistantFun: {
                init: null, 
                confirm: null, 
                keep: null, 
                edit: null 
            }
        }
        console.log(vm.data.interaction.response.docInfo.documentID)
        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization function]
         */
        vm.data.assistantFun.init = function() {
            var docGroup = GroupService.get();
            vm.data.info.group.parent = docGroup;
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('012100084'), $state.params.projectName, $filter('translate')('012100077')] });
            if (vm.data.interaction.response.docInfo.groupID > 0) {
                for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                    var val = vm.data.info.group.parent[i];
                    if (val.groupID == vm.data.interaction.response.docInfo.groupID) {
                        vm.data.info.group.child = [{ groupID: -1, groupName: $filter('translate')('012100085') }].concat(val.childGroupList);
                        break;
                    }
                }
            } else {
                vm.data.info.group.child = [{ groupID: -1, groupName: $filter('translate')('012100085') }].concat(vm.data.info.group.parent[0].childGroupList);
            }
            if (vm.data.info.reset.documentID || vm.data.interaction.response.docInfo.groupID > 0) {
                vm.data.interaction.response.docInfo.groupID = parseInt(vm.data.interaction.response.docInfo.groupID);
                if (vm.data.interaction.response.docInfo.childGroupID) {
                    vm.data.interaction.response.docInfo.childGroupID = parseInt(vm.data.interaction.response.docInfo.childGroupID);
                } else {
                    vm.data.interaction.response.docInfo.childGroupID = -1;
                }
            } else {
                vm.data.interaction.response.docInfo.groupID = vm.data.info.group.parent[0].groupID;
                vm.data.interaction.response.docInfo.childGroupID = -1;
            }
        }
        /**
         * @function [初始化功能函数] [initialization function]
         */
        vm.data.fun.init = function() {
            var template = {
                cache: {
                    group: GroupService.get()
                }
            }
            if (template.cache.group) {
                if (vm.data.info.reset.documentID) {
                    ApiManagementResource.Doc.Detail({
                        documentID: vm.data.info.reset.documentID,
                        groupID: vm.data.info.reset.childGroupID ? vm.data.info.reset.childGroupID : vm.data.info.reset.groupID,
                        projectID: vm.data.info.reset.projectID
                    }).$promise.then(function(data) {
                        if (code == data.statusCode) {
                            vm.data.interaction.response.docInfo = data.documentInfo;
                            vm.data.interaction.response.docInfo.contentType = "" + vm.data.interaction.response.docInfo.contentType;
                            vm.data.interaction.response.docInfo.docRichNote = vm.data.interaction.response.docInfo.contentType == '0' ? vm.data.interaction.response.docInfo.content : '';
                            vm.data.interaction.response.docInfo.docMarkdownNote = vm.data.interaction.response.docInfo.contentType == '1' ? vm.data.interaction.response.docInfo.content : '';
                            $scope.$emit('$windowTitle', { apiName: (vm.data.info.reset.type == 2 ? $filter('translate')('012100086') : $filter('translate')('012100087')) + vm.data.interaction.response.docInfo.title });
                            if (!!vm.data.interaction.response.docInfo.parentGroupID) {
                                vm.data.interaction.response.docInfo.childGroupID = vm.data.interaction.response.docInfo.groupID;
                                vm.data.interaction.response.docInfo.groupID = vm.data.interaction.response.docInfo.parentGroupID;
                            } else {
                                vm.data.interaction.response.docInfo.childGroupID = -1;
                            }
                            if (vm.data.interaction.response.docInfo.contentType == '1') {
                                $scope.$broadcast('$changeNoteType');
                            }
                            vm.data.assistantFun.init();
                        }
                    });
                } else {
                    vm.data.assistantFun.init();
                    $scope.$emit('$windowTitle', { apiName: $filter('translate')('012100088') });
                    vm.data.interaction.response.docInfo.contentType = '0';
                    vm.data.interaction.response.docInfo.title = '';
                }
            }

        }
        vm.data.fun.init();
        /**
         * @function [更改父分组] [Change the parent group]
         */
        vm.data.fun.change.group = function() {
            for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                var val = vm.data.info.group.parent[i];
                if (val.groupID == vm.data.interaction.response.docInfo.groupID) {
                    vm.data.info.group.child = [{ groupID: -1, groupName: $filter('translate')('012100085') }].concat(val.childGroupList);
                    vm.data.interaction.response.docInfo.childGroupID = -1;
                    break;
                }
            }
        }
        /**
         * @function [更改备注说明类型] [Change the note description type]
         */
        vm.data.fun.change.noteType = function() {
            $scope.$broadcast('$changeNoteType');
        }
        /**
         * @function [返回功能函数] [Back to function]
         */
        vm.data.fun.back = function() {
            if (vm.data.info.reset.documentID) {
                $state.go('home.project.inside.doc.detail', { 'groupID': vm.data.info.reset.groupID, 'childGroupID': vm.data.info.reset.childGroupID, 'documentID': vm.data.info.reset.documentID });
            } else {
                $state.go('home.project.inside.doc.list', { 'groupID': vm.data.info.reset.groupID, 'childGroupID': vm.data.info.reset.childGroupID });
            }
        }
        /**
         * @function [辅助确认功能函数] [Auxiliary confirmation function]
         */
        vm.data.assistantFun.confirm = function() {
            var info = {
                projectID: vm.data.info.reset.projectID,
                groupID: vm.data.interaction.response.docInfo.childGroupID > 0 ? vm.data.interaction.response.docInfo.childGroupID : vm.data.interaction.response.docInfo.groupID,
                documentID: vm.data.info.reset.documentID,
                title: vm.data.interaction.response.docInfo.title,
                docHeader: vm.data.interaction.response.docInfo.docHeader,
                content: vm.data.interaction.response.docInfo.contentType == '1' ? vm.data.interaction.response.docInfo.docMarkdownNote : vm.data.interaction.response.docInfo.docRichNote,
                contentRaw: vm.data.interaction.response.docInfo.contentRaw,
                contentType: vm.data.interaction.response.docInfo.contentType
            }
            return info;
        }
        /**
         * @function [编辑相关系列按钮功能函数] [Edit related series button function]
         */
        vm.data.fun.load = function(arg) {
            $scope.$emit('$translateferStation', { state: '$LoadingInit', data: arg });
        }
        /**
         * @function [发送存储请求时预处理功能函数] [Preprocessing function when sending a store request]
         */
        vm.data.fun.requestProcessing = function(arg) { //arg status:（0：继续添加 1：快速保存，2：编辑（修改/新增））
            var template = {
                request: vm.data.assistantFun.confirm(),
                promise: null
            }
            if ($scope.editForm.$valid && !!template.request.content) {
                vm.data.info.input.disable = true;
                switch (arg.status) {
                    case 0:
                        {
                            template.promise = vm.data.assistantFun.keep({ request: template.request });
                            break;
                        }
                    case 1:
                        {
                            template.promise = vm.data.assistantFun.edit({ request: template.request });
                            break;
                        }
                }
            } else {
                $rootScope.InfoModal($filter('translate')('012100089'), 'error');
                vm.data.info.input.submited = true;
            }
            return template.promise;
        }
        /**
         * @function [辅助继续添加功能函数] [Assist to continue adding function functions]
         */
        vm.data.assistantFun.keep = function(arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Doc.Add(arg.request).$promise;
            template.promise.then(function(data) {
                vm.data.info.input.disable = false;
                if (data.statusCode == code) {
                    $rootScope.InfoModal($filter('translate')('012100090'), 'success');
                    vm.data.interaction.response.docInfo = {
                        projectID: vm.data.info.reset.projectID,
                        groupID: vm.data.info.reset.groupID == '-1' ? vm.data.info.group.parent[0].groupID : parseInt(vm.data.info.reset.groupID),
                        title: '',
                        docMarkdownNote: '',
                        docRichNote: '',
                        contentType: '0',
                        contentRaw: ''
                    };
                    if (vm.data.info.reset.groupID > 0) {
                        for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                            var val = vm.data.info.group.parent[i];
                            if (val.groupID == vm.data.info.reset.groupID) {
                                vm.data.info.group.child = [{ groupID: -1, groupName: $filter('translate')('012100085') }].concat(val.childGroupList);
                                break;
                            }
                        }
                    } else {
                        vm.data.info.group.child = [{ groupID: -1, groupName: $filter('translate')('012100085') }].concat(vm.data.info.group.parent[0].childGroupList);
                    }
                    if (vm.data.info.reset.childGroupID) {
                        vm.data.interaction.response.docInfo.childGroupID = parseInt(vm.data.info.reset.childGroupID);
                    } else {
                        vm.data.interaction.response.docInfo.childGroupID = -1;
                    }
                    $scope.$broadcast('$resetWangEditor');
                    $scope.$broadcast('$resetMarkdown');
                    vm.data.info.input.submited = false;
                    window.scrollTo(0, 0);
                }
            })
            return template.promise;
        }
        /**
         * @function [编辑功能函数] [Edit]
         */
        vm.data.assistantFun.edit = function(arg) {
            var template = {
                promise: null
            }
            if (vm.data.info.reset.documentID && $state.params.type != 2) {
                vm.data.info.input.disable = true;
                template.promise = ApiManagementResource.Doc.Update(arg.request).$promise;
                template.promise.then(function(data) {
                    vm.data.info.input.disable = false;
                    if (data.statusCode == code) {
                        $state.go('home.project.inside.doc.detail', { 'groupID': vm.data.info.reset.groupID, 'childGroupID': vm.data.info.reset.childGroupID, 'documentID': vm.data.info.reset.documentID });
                        $rootScope.InfoModal($filter('translate')('012100091'), 'success');
                    }
                })
            } else {
                vm.data.info.input.disable = true;
                template.promise = ApiManagementResource.Doc.Add(arg.request).$promise;
                template.promise.then(function(data) {
                    vm.data.info.input.disable = false;
                    if (data.statusCode == code) {
                        $state.go('home.project.inside.doc.detail', { 'groupID': vm.data.info.reset.groupID, 'childGroupID': vm.data.info.reset.childGroupID, 'documentID': data.documentID });
                        $rootScope.InfoModal($filter('translate')('012100090'), 'success');
                    }
                })
            }
            return template.promise;
        }

        $scope.$on('$SidebarFinish', function() {
            vm.data.fun.init();
        })
    }
})();
