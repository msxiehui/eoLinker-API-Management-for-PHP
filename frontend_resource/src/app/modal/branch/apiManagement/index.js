(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [ams弹窗controller js] [Public bucket controller js]
     * @version  3.1.7
     */
    angular.module('eolinker.modal')

    .directive('eoApiManagementModal', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/modal/branch/apiManagement/index.html'
        }
    }])

    .controller('ApiManagement_AutoGenerationModalCtrl', ApiManagement_AutoGenerationModalCtrl)

    .controller('ApiManagement_BackupsModalCtrl', ApiManagement_BackupsModalCtrl)

    .controller('ApiManagement_AutomatedTest_QiuckAddSingalModalCtrl', ApiManagement_AutomatedTest_QiuckAddSingalModalCtrl)

    .controller('ApiManagement_AutomatedTest_EditCaseModalCtrl', ApiManagement_AutomatedTest_EditCaseModalCtrl)

    .controller('ApiManagement_AutomatedTest_BindModalCtrl', ApiManagement_AutomatedTest_BindModalCtrl)

    /**
     * @function [自动生成文档相关] [Automatically generated documents related]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    ApiManagement_AutoGenerationModalCtrl.$inject = ['$scope', '$uibModalInstance', 'input'];

    function ApiManagement_AutoGenerationModalCtrl($scope, $uibModalInstance, input) {
        $scope.data = {
            input: {},
            fun: {
                cancle: null
            }
        }
        var data = {
                fun: {
                    init: null
                }
            }
            /**
             * @description 取消关闭弹窗
             */
        $scope.data.fun.cancel = function() {
                $uibModalInstance.close(false);
            }
            /**
             * @description 初始化input数据
             */
        data.fun.init = (function() {
            $scope.data.input = Object.create(input);
        })()
    }

    /**
     * @function [备份项目相关] [Automatically generated documents related]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    ApiManagement_BackupsModalCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ApiManagementResource', '$state', 'md5', '$filter', 'CODE'];

    function ApiManagement_BackupsModalCtrl($scope, $rootScope, $uibModalInstance, ApiManagementResource, $state, md5, $filter, CODE) {
        $scope.data = {
            info: {
                isRemember: false
            },
            interaction: {
                request: {
                    userCall: null,
                    userPassword: null
                }
            },
            fun: {
                cancle: null
            }
        }
        var data = {
                fun: {
                    init: null,
                    cancel: null,
                    confirm: null
                }
            }
            /**
             * @function [初始化input数据] [Initialize the input data]
             */
        data.fun.init = (function() {
                var template = {
                    interaction: {
                        request: JSON.parse(window.localStorage['ONLINEINFO'] || '{}')
                    }
                }
                if (window.localStorage['ONLINEINFO']) {
                    try {
                        $scope.data.interaction.request.userCall = template.interaction.request.userCall;
                        $scope.data.interaction.request.userPassword = $filter('aesDecryptFilter')(template.interaction.request.userPassword);
                        $scope.data.info.isRemember = true;
                    } catch (e) {
                        $scope.data.info.isRemember = false;
                    }
                }
            })()
            /**
             * @function [确认是否已登录功能函数] [Confirm if you are logged in]
             */
        $scope.data.fun.confirm = function() {
                var template = {
                    storage: {
                        userCall: $scope.data.interaction.request.userCall,
                        userPassword: $filter('aesEncryptFilter')($scope.data.interaction.request.userPassword)
                    },
                    request: {
                        userCall: $scope.data.interaction.request.userCall,
                        userPassword: md5.createHash($scope.data.interaction.request.userPassword),
                        projectID: $state.params.projectID,
                        verifyCode: md5.createHash((new Date()).toUTCString())
                    }
                }
                if ($scope.loginForm.$valid) {
                    $scope.data.info.submitted = false;
                    ApiManagementResource.Backup.backupProject(template.request).$promise.then(function(response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS:
                                {
                                    $rootScope.InfoModal($filter('translate')('620'), 'success');
                                    if ($scope.data.info.isRemember) {
                                        window.localStorage.setItem('ONLINEINFO', angular.toJson(template.storage));
                                    } else {
                                        window.localStorage.removeItem('ONLINEINFO');
                                    }
                                    $uibModalInstance.close(false);
                                    break;
                                }
                            case '310001':{
                                $rootScope.InfoModal($filter('translate')('654'), 'error');
                                break;
                            }
                            case '310002':{
                                $rootScope.InfoModal($filter('translate')('655'), 'error');
                                break;
                            }
                            case '310003':{
                                $rootScope.InfoModal($filter('translate')('656'), 'error');
                                break;
                            }
                            case '310005':{
                                $rootScope.InfoModal($filter('translate')('657'), 'error');
                                break;
                            }
                            case '310006':{
                                $rootScope.InfoModal($filter('translate')('658'), 'error');
                                break;
                            }
                            case '310007':{
                                $rootScope.InfoModal($filter('translate')('659'), 'error');
                                break;
                            }
                            case '310008':{
                                $rootScope.InfoModal($filter('translate')('660'), 'error');
                                break;
                            }
                            case '310009':{
                                $rootScope.InfoModal($filter('translate')('661'), 'error');
                                break;
                            }
                            default:
                                {
                                    $rootScope.InfoModal($filter('translate')('621'), 'error');
                                    break;
                                }
                        }
                    })
                } else {
                    $scope.data.info.submitted = true;
                }
            }
            /**
             * @function [取消关闭弹窗] [Cancel to close the popup window]
             */
        $scope.data.fun.cancel = function() {
            $uibModalInstance.close(false);
        }
    }

    /**
     * @function [自动化测试加载API管理弹窗] [Automate test loading API management popups]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  Cache_CommonService [注入Cache_CommonService服务] [Injection Cache_CommonService service]
     * @service  Sidebar_AmsCommonService [注入Sidebar_AmsCommonService服务] [Injection Sidebar_AmsCommonService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    ApiManagement_AutomatedTest_QiuckAddSingalModalCtrl.$inject = ['$scope', 'Cache_CommonService', 'Sidebar_AmsCommonService', '$rootScope', '$uibModalInstance', 'input', '$filter'];

    function ApiManagement_AutomatedTest_QiuckAddSingalModalCtrl($scope, Cache_CommonService, Sidebar_AmsCommonService, $rootScope, $uibModalInstance, input, $filter) {
        $scope.data = {
            input: {},

            component: {
                groupCommonObject: {}
            },
            interaction: {
                response: {
                    apiList: null
                }
            },
            fun: {
                confirm: null,
                cancel: null,
                select: null
            }
        }
        var data = {
            service: {
                defaultCommon: Sidebar_AmsCommonService,
                cache: Cache_CommonService
            },
            output: {},
            fun: {
                init: null,
                click: {
                    parent: null,
                    child: null
                }
            }
        }
        $scope.data.fun.select = function(arg) {
            try {
                data.output.isClick = false;
            } catch (e) {}
            arg.item.isClick = true;
            data.output = arg.item;
            console.log(arg.item)
        }
        $scope.data.fun.confirm = function() {
            if (!data.output.isClick) return;
            data.output.isClick = false;
            $uibModalInstance.close(data.output);
        }
        data.fun.click.child = function(arg) {
            $scope.data.input.request.childGroupID = arg.item.groupID;
        }
        data.fun.click.parent = function(arg) {
            $scope.data.input.request.groupID = arg.item.groupID || -1;
            $scope.data.input.request.childGroupID = null;
            arg.item.isSpreed = true;
        }
        $scope.data.fun.cancel = function() {
            data.output.isClick = false;
            $uibModalInstance.close(false);
        }
        $scope.data.fun.filter = function(arg) {
            if ($scope.data.input.request.groupID == -1) return arg;
            if ($scope.data.input.request.childGroupID && $scope.data.input.request.childGroupID == arg.groupID) {
                return arg;
            } else if (!$scope.data.input.request.childGroupID && (arg.groupID == $scope.data.input.request.groupID || arg.parentGroupID == $scope.data.input.request.groupID)) {
                return arg;
            }
        }
        data.fun.init = (function() {
            var template = {
                cache: {
                    group: data.service.cache.get('apiGroup'),
                    apiList: data.service.cache.get('apiList')
                }
            }
            angular.copy(input, $scope.data.input);
            $scope.data.component.groupCommonObject = {
                mainObject: {
                    level: 2,
                    baseInfo: {
                        name: 'groupName',
                        id: 'groupID',
                        childID: 'childGroupID',
                        child: 'childGroupList',
                        interaction: $scope.data.input.request
                    },
                    staticQuery: [{ groupID: -1, groupName: $filter('translate')('633'), icon: 'sort' }],
                    baseFun: {
                        parentClick: data.fun.click.parent,
                        childClick: data.fun.click.child,
                        spreed: data.service.defaultCommon.fun.spreed
                    }
                }
            }
            if (template.cache.group) {
                $scope.data.interaction.response.groupList = template.cache.group;
            } else {
                input.resource.ApiGroup.Query(input.request).$promise.then(function(response) {
                    $scope.data.interaction.response.groupList = data.service.defaultCommon.sort.init(response);
                    data.service.cache.set($scope.data.interaction.response.groupList, 'apiGroup');
                })
            }
            if (template.cache.apiList) {
                $scope.data.interaction.response.apiList = template.cache.apiList;
            } else {
                switch (input.status) {
                    case 'advanced-pro':
                        {
                            input.resource.AutomatedTestCaseSingle.ApiList(input.request)
                            .$promise.then(function(response) {
                                $scope.data.interaction.response.apiList = response.apiList || [];
                                data.service.cache.set($scope.data.interaction.response.apiList, 'apiList');
                            })
                            break;
                        }
                    default:
                        {
                            input.resource.Api.All(input.request).$promise.then(function(response) {
                                $scope.data.interaction.response.apiList = response.apiList || [];
                                data.service.cache.set($scope.data.interaction.response.apiList, 'apiList');
                            })
                            break;
                        }
                }

            }
        })()
    }

    /**
     * @function [新增用例弹窗] [Use case pop-ups]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    ApiManagement_AutomatedTest_EditCaseModalCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'input', '$filter'];

    function ApiManagement_AutomatedTest_EditCaseModalCtrl($scope, $rootScope, $uibModalInstance, input, $filter) {
        $scope.data = {
            input: {},
            output: {},
            fun: {
                confirm: null,
                cancel: null
            }
        }
        var data = {
            fun: {
                init: null
            }
        }
        $scope.data.fun.change = function() {
            for (var i = 0; i < $scope.data.input.group.parent.length; i++) {
                var val = $scope.data.input.group.parent[i];
                if (val.groupID == $scope.data.output.groupID) {
                    $scope.data.input.group.child = [{
                        groupID: -1,
                        groupName: $filter('translate')('649')
                    }].concat(val.childGroupList);
                    $scope.data.output.childGroupID = -1;
                    break;
                }
            }
        }
        $scope.data.fun.confirm = function() {
            var template = {
                output: {
                    caseName: $scope.data.input.caseInfo.caseName,
                    caseType: $scope.data.input.caseInfo.caseType || '0',
                    groupID: $scope.data.output.childGroupID == -1 ? $scope.data.output.groupID : $scope.data.output.childGroupID,
                }
            }
            if ($scope.ConfirmForm.$valid) {
                $uibModalInstance.close(template.output);
            }
        }
        $scope.data.fun.cancel = function() {
            $uibModalInstance.close(false);
        }
        data.fun.init = (function() {
            input.caseInfo.caseType = (input.caseInfo.caseType || 0).toString();
            angular.copy(input, $scope.data.input);
            if (input.group.groupID == -1) {
                $scope.data.output.groupID = $scope.data.input.group.parent[0].groupID;
                $scope.data.input.group.child = [{
                    groupID: -1,
                    groupName: $filter('translate')('649')
                }].concat($scope.data.input.group.parent[0].childGroupList);
                $scope.data.output.childGroupID = -1;
            } else {
                $scope.data.output.groupID = input.group.groupID;
                $scope.data.output.childGroupID = input.group.childGroupID;
                for (var i = 0; i < $scope.data.input.group.parent.length; i++) {
                    var val = $scope.data.input.group.parent[i];
                    if (val.groupID == $scope.data.output.groupID) {
                        $scope.data.input.group.child = [{
                            groupID: -1,
                            groupName: $filter('translate')('649')
                        }].concat(val.childGroupList);
                        break;
                    }
                }
            }
        })()
    }

    /**
     * @function [自动化测试绑定参数值管理弹窗] [Automated Test Binding Parameter Value Management Pop-up]
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  $uibModalInstance [注入$uibModalInstance服务] [Injection $uibModalInstance service]
     * @service  Cache_CommonService [注入Cache_CommonService服务] [Injection Cache_CommonService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @param    {[obj]}   input [参数详情 Parameter details]
     */
    ApiManagement_AutomatedTest_BindModalCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'Cache_CommonService', 'input', '$filter'];

    function ApiManagement_AutomatedTest_BindModalCtrl($scope, $rootScope, $uibModalInstance, Cache_CommonService, input, $filter) {
        $scope.data = {
            info: {
                current: {
                    matchRule: []
                },
                isCurrent: false
            },
            input: {},
            fun: {
                cancel: null, //关闭功能函数
                confirm: null, //确认功能函数
                last: null
            }
        }
        var data = {
            service: {
                cache: Cache_CommonService
            },
            fun: {
                init: null
            }
        }
        $scope.data.fun.filter = function (arg) {
            if (!arg || arg.paramKey == '') {
                return false;
            } else {
                return true;
            }
        }
        $scope.data.fun.click = function () {
            var template = {
                bind: '',
                activeArray: []
            }
            try {
                for (var key in arguments) {
                    var val = arguments[key];
                    switch (key) {
                        case 0:
                            {
                                $scope.data.info.current.connID = val.connID;
                                break;
                            }
                    }
                    template.bind += '.' + val.paramKey;
                    template.activeArray.push(val.parent + val.paramKey);
                }

                $scope.data.info.current.bind = template.bind;
                $scope.data.info.current.activeArray = template.activeArray;
            } catch (e) {
                console.log(e);
            }
        }
        $scope.data.fun.changeSingal = function (arg) {
            var template = {
                json: {}
            }
            if (arg.item.connID == $scope.data.info.current.connID) return;
            angular.copy(arg.item, template.json);
            $scope.data.info.current = template.json;

        }
        $scope.data.fun.confirm = function () {
            if ($scope.data.info.current.bind) {
                $uibModalInstance.close({
                    bind: $scope.data.info.current.bind,
                    connID: $scope.data.info.current.connID
                });
            } else {
                $rootScope.InfoModal($filter('translate')('653'), 'error');
            }

        };
        $scope.data.fun.cancel = function () {
            $uibModalInstance.close(false);
        };
        data.fun.init = (function () {
            angular.copy(input, $scope.data.input);
            $scope.data.info.current = $scope.data.input.query[0];
        })()
    }

})();