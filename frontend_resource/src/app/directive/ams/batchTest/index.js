(function () {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [批量测试指令] [Batch test instructions]
     * @version  3.1.7
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @param {object} statusObject [测试状态] [Test status]
     * @param {object} env [环境变量] [Environment variables]
     * @param {array} caseList 测试用例数组 [Test case array]
     * @param {array} output 输出数组 [Output array]
     * @param {string} status [当前使用描述'automated'自动化测试] [Currently used to describe 'automated' automated testing]
     */
    angular.module('eolinker')

        .directive('batchTestDirective', [function () {
            return {
                restrict: 'A',
                replace: true,
                template: '<div class="hidden"><div id="plug-batch-in-js" ng-switch="status"><span ng-switch-when="automated-global" id="automated-text">{"flag":{{flag}},"env":{{env}}}</span><span ng-switch-default>{"caseList":{{caseList}},"env":{{env||\'{}\'}}}</span><span ng-switch-when="automated" id="automated-text">{"flag":{{flag}},"env":{{env}}}</span></div><div id="plug-batch-in-result-js"></div></div>',
                scope: {
                    statusObject: '=',
                    env: '<',
                    caseList: '<',
                    output: '=',
                    status: '@',
                    flag: '<',
                    reportObject:'='
                },
                link: function ($scope, elem, attrs, ctrl) {
                    var data = {
                        elem: document.getElementById('plug-batch-in-result-js'),
                        fun: {
                            init: null,
                            DOMSubtreeModified: null
                        }
                    }

                    /**
                     * @function [dom节点变化监听函数] [dom node change monitoring function]
                     */
                    data.fun.DOMSubtreeModified = function (input) {
                        switch ($scope.status) {
                            case 'automated-global':
                                {
                                    if (!$scope.statusObject.testing) {
                                        return;
                                    }
                                    var template = {
                                        text: input,
                                    }
                                    if (!template.text) return;
                                    try {
                                        template.output = JSON.parse(window.sessionStorage.getItem('plug-background-result'));
                                        $scope.reportObject.object = template.output;
                                        switch (template.output.status) {
                                            case 'tested':
                                                {
                                                    $scope.reportObject.testing = $scope.statusObject.testing = false;
                                                    break;
                                                }
                                        }
                                    } catch (e) {
                                        $scope.statusObject.testing = false;
                                    }
                                    $scope.$root && $scope.$root.$$phase || $scope.$apply();
                                    break;
                                }
                            default:
                                {
                                    $scope.output = $scope.output || [];
                                    if (!$scope.statusObject.testing) {
                                        return;
                                    }
                                    var template = {
                                        text: data.elem.innerText,
                                    }
                                    if (!template.text) return;
                                    try {
                                        template.output = JSON.parse(window.sessionStorage.getItem('plug-background-result')) || JSON.parse(template.text);
                                        switch ($scope.statusObject.type) {
                                            case 'all':
                                                {
                                                    $scope.output = template.output.responseList;
                                                    switch (template.output.status) {
                                                        case 'tested':
                                                            {
                                                                $scope.statusObject.testing = false;
                                                                break;
                                                            }
                                                    }
                                                    break;
                                                }
                                            case 'singal':
                                                {
                                                    angular.forEach($scope.statusObject.caseList, function (val, key) {
                                                        if (template.output.responseList[val.$index] !== null) {
                                                            $scope.output[val.$index] = template.output.responseList[val.$index];
                                                            val.testing = false;
                                                            $scope.statusObject.caseList.splice(key, 1);
                                                        }
                                                    })
                                                    if ($scope.statusObject.caseList.length <= 0) {
                                                        $scope.statusObject.testing = false;
                                                    }
                                                    break;
                                                }
                                        }
                                    } catch (e) {
                                        $scope.statusObject.testing = false;
                                        $scope.output = [];
                                    }
                                    window.sessionStorage.setItem('plug-background-result', null);
                                    $scope.$apply();
                                    break;
                                }
                        }

                    }

                    /**
                     * @function [自启动初始化功能函数] [Self-start initialization function]
                     */
                    data.fun.init = (function () {
                        angular.element(data.elem).bind('DOMSubtreeModified', data.fun.DOMSubtreeModified);
                    })()

                    /**
                     * 监听自动化测试用例测试
                     */
                    data.fun.watchGlobalTest = function (input) {
                        if (!vm.statusObject.testing) {
                            return;
                        }
                        var template = {
                            text: input,
                        }
                        if (!template.text) return;
                        try {

                            template.output = JSON.parse(window.sessionStorage.getItem('plug-background-result'));
                            switch (vm.statusObject.type) {
                                case 'all':
                                    {
                                        vm.reportObject.object = template.output;
                                        switch (template.output.status) {
                                            case 'tested':
                                                {
                                                    vm.reportObject.testing = vm.statusObject.testing = false;
                                                    break;
                                                }
                                        }
                                        break;
                                    }
                            }
                        } catch (e) {
                            vm.statusObject.testing = false;
                        }
                        $scope.$root && $scope.$root.$$phase || $scope.$apply();
                    }
                }
            };
        }]);
})();