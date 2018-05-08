(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [侧边栏组件] [Sidebar components]
     * @version  3.1.6
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @extend {object} authorityObject 权限类{edit}
     * @extend {object} funObject 第一部分功能集类{showVar,btnGroupList{edit:{fun,key,class,showable,icon,tips},sort:{default,cancel,confirm:{fun,key,showable,class,icon,tips}}}}
     * @extend {object} sortObject 排序信息{sortable,groupForm}
     * @extend {object} mainObject 主类{level,extend,query,baseInfo:{name,id,child,fun:{edit,delete},parentFun:{addChild}}}
     */
    angular.module('eolinker')
        .component('sidebarCommonComponent', {
            templateUrl: 'app/component/common/sidebar/index.html',
            controller: indexController,
            bindings: {
                shrinkObject: '<',
                mainObject: '<',
                powerObject: '<',
                pluginList: '<'
            }
        })

    indexController.$inject = ['$scope', '$state', 'NavbarService'];

    function indexController($scope, $state, NavbarService) {
        var vm = this;
        vm.data = {
            info: {
                current: null
            },
            service: {
                default: NavbarService,
            },
            fun: {
                shrink: null
            }
        }
        vm.data.fun.initMenu = function(arg) {
            if ($state.current.name.indexOf(arg.item.sref) > -1) {
                vm.data.info.current = arg.item;
                if (arg.item.childList) {
                    vm.data.service.default.info.navigation = {
                        query: [{ name: arg.item.name }]
                    }
                    for (var $index = 0; $index < arg.item.childList.length; $index++) {
                        var val = arg.item.childList[$index];
                        if ($state.current.name.indexOf(val.sref) > -1) {
                            vm.data.service.default.info.navigation.current = val.name;
                            break;
                        }
                    }
                } else {
                    vm.data.service.default.info.navigation = {
                        query: vm.mainObject.baseInfo.navigation || null,
                        current: arg.item.name
                    }
                }
            }
        }
        vm.data.fun.shrink = function() {
            vm.shrinkObject.isShrink = !vm.shrinkObject.isShrink;
            if (vm.mainObject.baseFun&&vm.mainObject.baseFun.shrink) {
                vm.mainObject.baseFun.shrink();
            }
        }
        vm.data.fun.menu = function(arg,status) {
            if (arg.item.disable && vm.data.service.pro.info.isExpire) return;
            if (!arg.item.href) {
                arg.item.back = false;
                vm.data.info.current = arg.item;
                if (arg.item.childList) {
                    vm.shrinkObject.isShrink = false;
                    vm.data.service.default.info.navigation = {
                        query: [{ name: arg.item.name }],
                        current: arg.item.childList[0].name
                    }
                } else {
                    switch (status) {
                        case 'child':
                            {
                                vm.data.service.default.info.navigation.current = arg.item.name;
                                break;
                            }
                        default:
                            {
                                vm.data.service.default.info.navigation = {
                                    query: vm.mainObject.baseInfo.navigation || null,
                                    current: arg.item.name
                                }
                                break
                            }
                    }
                }
            }
            if (arg.item.childSref) {
                if (arg.item.otherChildSref && JSON.parse(window.localStorage['VERSIONINFO'] || '{}').companyHashKey) {
                    $state.go(arg.item.otherChildSref, arg.item.otherParams);
                } else {
                    $state.go(arg.item.childSref, arg.item.params);
                }
            } else if (arg.item.sref) {
                $state.go(arg.item.sref, arg.params);
            } else {
                window.open(arg.item.href);
            }
        }
    }
})();
