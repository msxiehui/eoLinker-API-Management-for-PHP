(function() {
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [自动化测试侧边栏相关js] [ automated test sidebar related js]
     * @version  3.1.7
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  Sidebar_AmsCommonService [注入Sidebar_AmsCommonService服务] [Injection Sidebar_AmsCommonService service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('eolinker')
        .component('homeProjectInsideTestSidebar', {
            templateUrl: 'app/component/content/home/content/project/content/inside/sidebar/test/index.html',
            controller: indexController,
            bindings: {
                powerObject: '<'
            }
        })

    indexController.$inject = ['$scope', 'ApiManagementResource', '$state', 'CODE', '$rootScope', 'GroupService', 'Sidebar_AmsCommonService','$filter'];

    function indexController($scope, ApiManagementResource, $state, CODE, $rootScope, GroupService, Sidebar_AmsCommonService, $filter) {
        var vm = this;
        vm.data = {
            service: {
                defaultCommon: Sidebar_AmsCommonService,
            },
            static: {
                query: [{ groupID: -1, groupName: $filter('translate')('01214024'), icon: 'sort' }]
            },
            component: {
                groupCommonObject: {}
            },
            info: {
                sidebarShow: null,
                sort: {
                    isDisable: false,
                    originQuery: [],
                    sortable: true,
                    sortForm: {
                        containment: '.group-form-ul',
                        child: {
                            containment: '.child-group-form-ul'
                        }
                    }
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID
                },
                response: {
                    query: []
                }
            },
            fun: {
                init: null, 
                click: {
                    parent: null, 
                    child: null 
                },
                sort: {
                    copy: null, 
                    confirm: null, 
                    cancle: null, 
                },
                edit: {
                    parent: null, 
                    child: null 
                },
                delete: {
                    parent: null, 
                    child: null 
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
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID
                },
                sort: {
                    array: []
                }
            }
            vm.data.service.defaultCommon.fun.clear();
            if (/test.((api)|(edit))/.test($state.current.name)) {
                vm.data.info.sidebarShow = false;
            } else {
                vm.data.info.sidebarShow = true;
            }
            ApiManagementResource.AutomatedTestGroup.Query(template.request).$promise.then(function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            template.sort.array = vm.data.service.defaultCommon.sort.init(response);
                            vm.data.interaction.response.groupOrder = response.groupOrder;
                            vm.data.interaction.response.query = template.sort.array || [];
                            GroupService.set(template.sort.array);
                            break;
                        }
                }
            })

        }
        vm.data.fun.init();
        /**
         * @function [复制相应原数组功能函数] [Copy the corresponding original array function]
         */
        vm.data.fun.sort.copy = function() {
            vm.data.info.sort.originQuery = [];
            angular.copy(vm.data.interaction.response.query, vm.data.info.sort.originQuery);
            if (vm.data.info.sort.originQuery.length > 0) {
                vm.data.info.sort.isDisable = true;
            }
        }
        /**
         * @function [取消排序功能函数] [Cancel sorting function]
         */
        vm.data.fun.sort.cancle = function() {
            vm.data.info.sort.isDisable = false;
        }
        /**
         * @function [排序确认功能函数] [Sort confirmation function]
         */
        vm.data.fun.sort.confirm = function() {
            var template = {
                input: {
                    baseRequest: {
                        projectID: vm.data.interaction.request.projectID,
                        orderList: {}
                    },
                    originQuery: vm.data.info.sort.originQuery,
                    resource: ApiManagementResource.AutomatedTestGroup.Sort,
                    callback: null
                }
            }
            template.input.callback = function(response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS:
                        {
                            vm.data.interaction.response.query = vm.data.info.sort.originQuery;
                            vm.data.info.sort.isDisable = false;
                            break;
                        }
                }
            }
            vm.data.service.defaultCommon.sort.operate('confirm', template.input);
        }
        /**
         * @function [子分组单击事件] [Sub-group click event]
         */
        vm.data.fun.click.child = function(arg) {
            vm.data.interaction.request.childGroupID = arg.item.groupID;
            $state.go('home.project.inside.test.default', { groupID: vm.data.interaction.request.groupID, childGroupID: arg.item.groupID, search: null });
        }
        /**
         * @function [父分组单击事件] [Parent group click event]
         */
        vm.data.fun.click.parent = function(arg) {
            vm.data.interaction.request.groupID = arg.item.groupID || -1;
            vm.data.interaction.request.childGroupID = null;
            arg.item.isSpreed = true;
            $state.go('home.project.inside.test.default', { 'groupID': arg.item.groupID, childGroupID: null, search: null });
        }
        /**
         * @function [父分组编辑事件] [Parent group edit event]
         */
        vm.data.fun.edit.parent = function(arg) {
            arg=arg||{};
            var template = {
                options:{
                    callback:vm.data.fun.init,
                    resource:ApiManagementResource.AutomatedTestGroup,
                    originGroupQuery:vm.data.interaction.response.query,
                    status:'parent-'+(arg.isEdit?'edit':'add'),
                    baseRequest:{
                        projectID:vm.data.interaction.request.projectID
                    }
                }
            }
            vm.data.service.defaultCommon.fun.operate('edit',arg,template.options);
        }
        /**
         * @function [子分组编辑事件] [Sub-group edit event]
         */
        vm.data.fun.edit.child = function(arg) {
            arg.item = arg.childItem || {};
            var template = {
                options:{
                    callback:vm.data.fun.init,
                    resource:ApiManagementResource.AutomatedTestGroup,
                    originGroupQuery:vm.data.interaction.response.query,
                    status:'child-'+(arg.isEdit?'edit':'add'),
                    baseRequest:{
                        projectID:vm.data.interaction.request.projectID
                    }
                }
            }
            arg.item.$index = arg.$outerIndex + 1;
            vm.data.service.defaultCommon.fun.operate('edit',arg,template.options);
        }
         /**
         * @function [子分组删除事件] [Sub-group delete event]
         */
        vm.data.fun.delete.child = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: $filter('translate')('01214018'),
                    message: $filter('translate')('01214022')
                }
            }
            $rootScope.EnsureModal(template.modal.title, false, template.modal.message, {}, function(callback) {
                if (callback) {
                    ApiManagementResource.AutomatedTestGroup.Delete({ projectID: vm.data.interaction.request.projectID, groupID: arg.childItem.groupID }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    arg.item.childGroupList.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('01214020'), 'success');
                                    if (vm.data.interaction.request.childGroupID == arg.childItem.groupID) {
                                        vm.data.fun.click.parent({ item: arg.item });
                                    }
                                    break;
                                }
                        }
                    })
                }
            });
        }
        vm.data.fun.import = function() {
            var template = {
                modal: {
                    title: $filter('translate')('01214027'),
                    status: 1,
                    request: {
                        projectID: vm.data.interaction.request.projectID
                    },
                    resource:ApiManagementResource.AutomatedTestGroup
                }
            }

            $rootScope.ImportModal(template.modal, function(callback) {
                if (callback) {
                    vm.data.fun.init();
                    switch (vm.data.interaction.request.groupID) {
                        case -1:
                        case '-1':
                            {
                                $state.go('home.project.inside.test.default', { groupID: $state.params.groupID ? (null):-1  });
                                break;
                            }
                    }
                }
            });
        }
        vm.data.fun.export = function(arg) {
            var template = {
                modal: {
                    status: 'group',
                    title: $filter('translate')('01214026'),
                    request: {
                        groupID: arg.status == 'parent' ? arg.item.groupID : arg.childItem.groupID
                    },
                    resource:ApiManagementResource.AutomatedTestGroup
                }
            }
            $rootScope.ExportModal(template.modal, function(callback) {});
        }

        /**
         * @function [父分组删除事件] [Parent group delete event]
         */
        vm.data.fun.delete.parent = function(arg) {
            arg = arg || {};
            var template = {
                modal: {
                    title: $filter('translate')('01214018'),
                    message: $filter('translate')('01214022')
                }
            }
            $rootScope.EnsureModal(template.modal.title, false, template.modal.message, {}, function(callback) {
                if (callback) {
                    ApiManagementResource.AutomatedTestGroup.Delete({ projectID: vm.data.interaction.request.projectID, groupID: arg.item.groupID }).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    vm.data.interaction.response.query.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('01214020'), 'success');
                                    if (vm.data.interaction.response.query.length > 0) {
                                        GroupService.set(vm.data.interaction.response.query);
                                    } else {
                                        GroupService.set(null);
                                    }
                                    if ($state.params.groupID == -1) {
                                        vm.data.fun.click.parent({ item: {} });
                                    } else if (vm.data.interaction.request.groupID == arg.item.groupID) {
                                        vm.data.fun.click.parent({ item: vm.data.static.query[0] });
                                    }
                                    break;
                                }
                        }
                    })
                }
            });
        }
        $scope.$on('$stateChangeSuccess', function() { //路由更改函数
            if (/(api)|(edit)/.test($state.current.name)) {
                vm.data.info.sidebarShow = false;
            } else {
                vm.data.info.sidebarShow = true;
            }
        })
        /**
         * @function [路由更改函数] [Routing change function]
         */
        vm.$onInit = function() {
            vm.data.component.groupCommonObject = {
                sortObject: vm.data.info.sort,
                funObject: {
                    showObject: vm.data.info.sort,
                    showVar: 'isDisable',
                    btnGroupList: {
                        edit: {
                            key: $filter('translate')('0121400'),
                            class: 'eo-button-success',
                            icon: 'tianjia',
                            showable: false,
                            fun: vm.data.fun.edit.parent
                        },
                        export: {
                            key: $filter('translate')('01214027'),
                            class: 'default-btn tab-first-btn',
                            icon: 'shangchuan',
                            showable: false,
                            fun: vm.data.fun.import
                        },
                        sortDefault: {
                            key: $filter('translate')('0121401'),
                            class: 'default-btn tab-last-btn',
                            icon: 'paixu',
                            showable: false,
                            fun: vm.data.fun.sort.copy
                        },
                        sortConfirm: {
                            key: $filter('translate')('0121402'),
                            class: 'default-btn tab-first-btn un-margin-left-btn',
                            icon: 'check',
                            showable: true,
                            fun: vm.data.fun.sort.confirm
                        },
                        sortCancel: {
                            key: $filter('translate')('0121403'),
                            class: 'default-btn tab-last-btn',
                            icon: 'close',
                            showable: true,
                            fun: vm.data.fun.sort.cancle
                        }
                    }
                },
                mainObject: {
                    level: 2,
                    baseInfo: {
                        name: 'groupName',
                        id: 'groupID',
                        childID: 'childGroupID',
                        child: 'childGroupList',
                        interaction: vm.data.interaction.request
                    },
                    staticQuery: vm.data.static.query,
                    parentFun: {
                        addChild: {
                            fun: vm.data.fun.edit.child,
                            key: $filter('translate')('01214017'),
                            params: { $outerIndex: null, isEdit: false },
                            class: 'add-child-btn'
                        },
                        export: {
                            fun: vm.data.fun.export,
                            key: $filter('translate')('01214026'),
                            params: { item: null, status: 'parent' }
                        },
                        edit: {
                            fun: vm.data.fun.edit.parent,
                            key: $filter('translate')('0121406'),
                            params: { item: null,isEdit:true }
                        },
                        delete: {
                            fun: vm.data.fun.delete.parent,
                            key: $filter('translate')('0121407'),
                            params: { item: null, $index: null }
                        }
                    },
                    childFun: {
                        export: {
                            fun: vm.data.fun.export,
                            key: $filter('translate')('01214026'),
                            params: { childItem: null, status: 'child' }
                        },
                        edit: {
                            fun: vm.data.fun.edit.child,
                            key: $filter('translate')('0121406'),
                            params: { childItem: null, $outerIndex: null, isEdit: true }
                        },
                        delete: {
                            fun: vm.data.fun.delete.child,
                            key: $filter('translate')('0121407'),
                            params: { item: null, childItem: null, $index: null }
                        }
                    },
                    baseFun: {
                        parentClick: vm.data.fun.click.parent,
                        childClick: vm.data.fun.click.child,
                        spreed: vm.data.service.defaultCommon.fun.spreed
                    }
                }
            }
        }
    }

})();
