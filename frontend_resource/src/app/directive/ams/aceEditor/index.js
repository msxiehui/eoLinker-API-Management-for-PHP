(function() {
    "use strict";
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [编辑器指令js] [Editor instructions js]
     * @version  3.1.9
     * @param {string} setVariable 设置绑定setModel的对象键，(optional)，需搭配setModel使用
     * @param {object} setModel 存储值位置，双绑
     * @param {string} type 语言类型{json,javascript}，默认json
     */
    angular.module('eolinker.directive')

        .directive("aceEditorAmsDirective", index);

    index.$inject = []

    function index() {
        return {
            restrict: 'AE',
            require: '?ngModel',
            scope: {
                setVariable: '<',
                setModel: '=',
                type: '@'
            },
            link: function($scope, element, attrs, ngModel) {
                var data = {
                    editor: null,
                    fun: {
                        init: null
                    }
                }
                data.fun.render = function() {
                    if ($scope.setVariable) {
                        data.editor.session.setValue($scope.setModel[$scope.setVariable] || '');
                    } else {
                        data.editor.session.setValue($scope.setModel || '');
                    }

                };
                /**
                 * 初始化编辑器
                 */
                data.fun.init = (function() {
                    data.editor = ace.edit(attrs.id);
                    element[0].style.fontSize = '14px';
                    element[0].style.lineHeight = '25px';
                    data.editor.setOptions({
                        minLines: 5,
                        maxLines: 15,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: true
                    });
                    if (ngModel) {
                        ngModel.$render = data.fun.render;
                    }
                    data.editor.getSession().on('change', function(e) {
                        if ($scope.setVariable) {
                            $scope.setModel[$scope.setVariable] = data.editor.getValue();
                        } else {
                            $scope.setModel = data.editor.getValue();
                        }
                    });
                    switch (attrs.type) {
                        case 'javascript':
                            {
                                data.editor.session.setMode("ace/mode/javascript");

                                data.editor.setAutoScrollEditorIntoView(true)
                                data.editor.resize()
                                break;
                            }
                        case 'json':
                        default:
                            {
                                data.editor.session.setMode("ace/mode/json");

                                break;
                            }
                    }

                })()

                $scope.$on('$ResetAceEditor_AmsEditor', function() {
                    data.editor.session.setValue('');
                })
                
                $scope.$on('$stateChangeStart', function() {
                    if (data.editor) data.editor.destroy();
                })

                $scope.$on('$InitAceEditor_AmsEditor', function() {
                    if ($scope.setVariable) {
                        data.editor.session.setValue($scope.setModel[$scope.setVariable] || '');
                    } else {
                        data.editor.session.setValue($scope.setModel || '');
                    }
                })
            }
        }

    };

})();