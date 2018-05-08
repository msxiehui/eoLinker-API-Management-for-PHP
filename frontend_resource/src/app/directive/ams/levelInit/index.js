(function () {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [json层级预处理指令] [json level preprocessing directive]
     * @version  3.1.9
     * @param {string} level 限制层级
     */
    angular.module('eolinker')

        .directive('levelInitDirective', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    level: '<',
                    limitLevel: '<',
                    status: '@'
                },
                link: function ($scope, elem, attrs, ctrl) {
                    var data = {
                        fun: {
                            init: null,
                        }
                    }



                    /**
                     * @function [自启动初始化功能函数] [Self-start initialization function]
                     */
                    data.fun.init = (function () {
                        var template = {
                            level: {
                                parent: $scope.level || '',
                                default: ($scope.level || 0) + 1,
                                limit: $scope.limitLevel || 5
                            },
                            html: ''
                        }
                        if (template.level.default > template.level.limit) {
                            return;
                        }
                        switch (attrs.status) {
                            case 'automatedTest_jsonMatch':
                                {
                                    template.html = '<ul><li ng-repeat="item' + template.level.default+' in item' + template.level.parent + '.childList" level-init-directive level=' + template.level.default+' limit-level=' + $scope.limitLevel + ' status=' + attrs.status + '>' +
                                    '<table>' +
                                    '<tbody>' +
                                    '<tr><td class="name-td">' +
                                    '<input style="margin-left:' + 15 * (template.level.default) + 'px;width:' + (308 - 15 * (template.level.default)) + 'px;" class="eo-input" ng-model="item' + template.level.default+'.paramKey" ng-class="{\'eo-input-error\':($ctrl.data.info.submited&&!item' + template.level.default+'.paramKey)}" maxlength="255" placeholder="参数名" ng-change="$ctrl.data.fun.last(\'responseParam\',{$last:$last,item:item' + template.level.parent + '})">' +
                                    '</td>' +
                                    '<td class="match-rule-td">' +
                                    '<select class="eo-input" ng-model="item' + template.level.default+'.matchRule" ng-init="item' + template.level.default+'.matchRule=item' + template.level.default+'.matchRule||\'0\'">' +
                                    '<option value="0">无</option>' +
                                    '<option value="1">等于 [ = ]</option>' +
                                    '<option value="2">不等于 [ != ]</option>' +
                                    '<option value="3">大于 [ &gt; ]</option>' +
                                    '<option value="4">小于 [ &lt; ]</option>' +
                                    '<option value="5">正则 [ Reg= ]</option>' +
                                    '</select>' +
                                    '</td>' +
                                    '<td>' +
                                    '<input class="eo-input pull-left" ng-model="item' + template.level.default+'.paramInfo"  placeholder="匹配值" >' +
                                    '</td>' +
                                    '<td class="operation-td">' +
                                    (template.level.default < $scope.limitLevel ? ('<a class=" number-label add-child-a" ng-click="$ctrl.data.fun.edit(\'addChild\',{item:item' + template.level.default+'})"><span class="iconfont icon-tianjia"></span><span>子字段</span></a>') : '') +
                                    '<a class="iconfont icon-shanchu number-label" ng-click="$ctrl.data.fun.delete(\'responseChild\',{$index:$index,item:item' + template.level.parent + '})"></a>' +
                                    '</td>' +
                                    '</tr></tbody>' +
                                    '</table>' +
                                    '</li>' +
                                    '</ul>';
                                    break;
                                }
                            case 'automatedTest_bindRule':
                                {
                                    template.level.argumentString = 'item '
                                    for (var key = 1; key <= template.level.default; key++) {
                                        template.level.argumentString += ', item' + key + ' ';
                                    }

                                    template.html = '<ul>' +
                                    '<li ng-repeat="item' + template.level.default+' in item' + template.level.parent + '.childList |filter:data.fun.filter" level-init-directive level=' + template.level.default+' limit-level=' + $scope.limitLevel + ' status=' + attrs.status + ' ng-class="{\'elem-active\':data.info.current.activeArray[' + template.level.default+']==(item' + template.level.default+'.parent+item' + template.level.default+'.paramKey)}" >' +
                                    '<p ng-click="data.fun.click(' + template.level.argumentString + ')"><span class="iconfont icon-xiangyou" style="font-size: 12px;color:#' + template.level.default+'0d' + template.level.default+'d4;margin-left:' + (template.level.default * 10) + 'px; " ></span>' +
                                    '{{item' + template.level.default+'.paramKey}}</p>' +
                                    '</li>' +
                                    '</ul>'
                                    break;
                                }
                            case 'report_jsonMatch':
                                {
                                    template.html = '<ul>' +
                                    '<li ng-repeat="item' + template.level.default+' in item' + template.level.parent + '.childList  | filter:$ctrl.data.fun.filter" level-init-directive level=' + template.level.default+' limit-level=' + $scope.limitLevel + ' status=' + attrs.status + ' >' +
                                    '<table>' +
                                    '<tbody><tr>' +
                                    '<td class="name-td"><span class="iconfont icon-xiangyou" style="font-size: 12px;color:#' + template.level.default+'0d' + template.level.default+'d4;margin-left:' + (template.level.default * 10) + 'px; " ></span>{{item' + template.level.default+'.paramKey}}</td>' +
                                    '<td class="rule-td" ng-switch="item' + template.level.default+'.matchRule">' +
                                    '<span ng-switch-when="0">无</span>' +
                                    '<span ng-switch-when="1">等于 [ = ]</span>' +
                                    '<span ng-switch-when="2">不等于 [ != ]</span>' +
                                    '<span ng-switch-when="3">大于 [ > ]</span>' +
                                    '<span ng-switch-when="4">小于 [ < ]</span>' +
                                    '<span ng-switch-when="5">正则 [ Reg= ]</span>' +
                                    '</td>' +
                                    '<td>{{item' + template.level.default+'.paramInfo}}</td>' +
                                    '</tr></tbody>' +
                                    '</table>' +
                                    '</li>' +
                                    '</ul>'
                                    break;
                                }
                        }
                        elem.append($compile(template.html)($scope.$parent));
                    })()
                }
            };
        }]);
})();