(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [侧边栏公用服务] [Sidebar public service]
     * @version  3.1.7
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  GroupService [注入GroupService服务] [inject GroupService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject code constant service]
     */
    angular.module('eolinker.service')
        .factory('Sidebar_AmsCommonService', index);

    index.$inject = ['GroupService', 'CODE', '$rootScope', '$filter']

    function index(GroupService, CODE, $rootScope, $filter) {
        var data = {
            service: GroupService,
            fun: {
                clear: null, 
                spreed: null,
            },
            sort: {
                operate: null,
                init: null, 
            }
        }

        /**
         * @function [清空分组服务] [Clear packet service]
         */
        data.fun.clear = function() {
            data.service.clear();
        };

        /**
         * @funciotn [父分组展开功能函数] [Parent group to expand the function]
         * @param {object} arg 参数，eg:{$event:dom,item:单击所处父分组项 Click the parent group item}
         */
        data.fun.spreed = function(arg) {
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            arg.item.isSpreed = !arg.item.isSpreed;
        }

        /**
         * @funciotn [分组操作] [Grouping operations]
         * @param {string} status [操作状态] [Operating status] 
         * @param {object} arg [传参] [Operating status]
         * @param {object} options 选项{callback:回调函数(选填),resource:请求资源,originGroupQuery:原始分组队列,status:状态（child），默认父分组}
         * @param {object} options Options {callback: callback function (optional), resource: request resource, originGroupQuery: original packet queue, status: status, default parent)
         */
        data.fun.operate = function(status, arg, options) {
            var template = {
                modal: {},
                $index: null
            }
            switch (status) {
                case 'edit':
                    {
                        template.modal = {
                            title: (options.status.indexOf('edit') > -1 ? $filter('translate')('0121406') : $filter('translate')('01214025')) + (options.status.indexOf('child') > -1 ? $filter('translate')('491') : $filter('translate')('012100095')),
                            secondTitle: $filter('translate')('01214014'),
                            group: options.status.indexOf('parent-edit') > -1 ? null : options.originGroupQuery
                        }
                        $rootScope.GroupModal(template.modal.title, arg.item, template.modal.secondTitle, template.modal.group, function(callback) {
                            if (callback) {
                                angular.merge(callback, callback, options.baseRequest);
                                switch (options.status) {
                                    case 'parent-edit':
                                        {
                                            break;
                                        }
                                    default:
                                        {
                                            template.$index = parseInt(callback.$index) - 1;
                                            if (template.$index > -1) {
                                                callback.parentGroupID = options.originGroupQuery[template.$index].groupID;
                                            }
                                            break;
                                        }
                                }
                                if (options.status.indexOf('edit') > -1) {
                                    // $filter('CurrentTime_CommonFilter')('object', callback, ['$index', 'isAdd']);
                                    options.resource.Edit(callback).$promise.then(function(response) {
                                        switch (response.statusCode) {
                                            case CODE.COMMON.SUCCESS:
                                                {
                                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('012100137'), 'success');
                                                    options.callback();
                                                    break;
                                                }
                                        }
                                    });
                                } else {
                                    // $filter('CurrentTime_CommonFilter')('object', callback, ['$index', 'groupID', 'isAdd']);
                                    options.resource.Add(callback).$promise.then(function(response) {
                                        switch (response.statusCode) {
                                            case CODE.COMMON.SUCCESS:
                                                {
                                                    $rootScope.InfoModal(template.modal.title + $filter('translate')('012100137'), 'success');
                                                    options.callback();
                                                    break;
                                                }
                                        }
                                    });
                                }
                            }
                        });
                        break;
                    }
                case 'delete':
                    {
                        break;
                    }
            }
        }

        /**
         * @funciotn [排序操作集合] [Sort operation set]
         * @param {string} status [操作状态] [Operating status] 
         * @param {object} arg 操作对象{baseRequest,resource,callback}
         * @return {any} promise [返回对象] [Return object]
         */
        data.sort.operate = function(status, arg) {
            var template = {
                request: {},
            };
            switch (status) {
                case 'confirm':
                    {
                        angular.merge(template.request, arg.baseRequest);
                        angular.forEach(arg.originQuery, function(val, key) {
                            template.request.orderList[val.groupID] = key;
                            angular.forEach(val.childGroupList, function(childVal, childKey) {
                                template.request.orderList[childVal.groupID] = childKey;
                            })
                        })
                        template.request.orderList = JSON.stringify(template.request.orderList);
                        arg.resource(template.request).$promise.then(function(response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS:
                                    {
                                        $rootScope.InfoModal($filter('translate')('01214010'), 'success');
                                        GroupService.set(arg.originQuery);
                                        break;
                                    }
                                default:
                                    {
                                        $rootScope.InfoModal($filter('translate')('01214011'), 'error');
                                        break;
                                    }
                            }
                            arg.callback(response);
                        });
                        break;
                    }
            }
        }

        /**
         * @funciot [分组列表排序初始整理函数] [Grouping list sorts the initial collation function]
         * @param  {object} data [传入分组列表] [Incoming group list]
         * @return {array}       [返回整理后分组列表] [Return the sorted group list]
         */
        data.sort.init = function(input) {
            var template = {
                output: {
                    _default: [],
                    array: [],
                    childArray: [],
                },
                loop: {
                    parent: 0,
                    child: 0
                }
            }
            try {
                template.output._default = JSON.parse(input.groupOrder);
                angular.forEach(input.groupList, function(val, key) {
                    template.output.childArray = [];
                    angular.forEach(val.childGroupList, function(childVal, childKey) {
                        childVal.$order = template.output._default[childVal.groupID];
                        template.loop.child = childVal.$order > (template.output.childArray.length - 1) ? (template.output.childArray.length - 1) : childVal.$order;
                        if (template.loop.child >= 0) {
                            for (; template.loop.child >= 0; template.loop.child--) {
                                if (template.output.childArray[template.loop.child].$order <= childVal.$order) {
                                    break;
                                }
                            }
                            template.output.childArray.splice(template.loop.child + 1, 0, childVal);
                        } else {
                            template.output.childArray.push(childVal);
                        }
                    })
                    val.isSpreed = true;
                    val.childGroupList = template.output.childArray;
                    val.$order = template.output._default[val.groupID];
                    template.loop.parent = val.$order > (template.output.array.length - 1) ? (template.output.array.length - 1) : val.$order;
                    if (template.loop.parent >= 0) {
                        for (; template.loop.parent >= 0; template.loop.parent--) {
                            if (template.output.array[template.loop.parent].$order <= val.$order) {
                                break;
                            }
                        }
                        template.output.array.splice(template.loop.parent + 1, 0, val);
                    } else {
                        template.output.array.push(val);
                    }
                })
            } catch (e) {
                template.output.array = input.groupList;
            }
            return template.output.array;
        }
        return data;
    }
})();