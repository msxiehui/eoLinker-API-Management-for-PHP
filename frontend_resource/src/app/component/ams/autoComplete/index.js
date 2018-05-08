(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [自动匹配组件] [自动匹配组件]
     * @version  3.2.2
     * @extends {string} placeholder 内置输入框placeholder内容[optional]
     * @extends {string} expressionBuilder 是否有构造器功能[optional](默认无)
     * @extends {string} addClass 输入框外置样式[optional]
     * @extends {array} array 预设列表
     * @extends {string} model 输入框绑定值
     * @extends {function} inputChangeFun 输入框预设函数[optional]
     */
    angular.module('eolinker')
        .component('autoCompleteAmsComponent', {
            templateUrl: 'app/component/ams/autoComplete/index.html',
            controller: indexController,
            bindings: {
                placeholder: '@',
                expressionBuilder: '@',
                addClass: '@',
                array: '<', //自定义数组填充数组 Populate an array with a custom array
                model: '=', //输入框绑定 Input box binding
                inputChangeFun: '&', //输入框值改变绑定功能函数 The input box value changes the binding function function
            }
        })

    indexController.$inject = ['$scope', '$rootScope'];

    function indexController($scope, $rootScope) {

        var vm = this;
        vm.data = {
            info: {
                hashCode: new Date().getTime(),
                array: {
                    filter: []
                },
                input: {
                    isFocus: false,
                },
                view: {
                    isShow: false
                },
                isFocus: false,
                expressionBuilderObject: {
                    request: {},
                    response: {}
                },
                elem: null
            },
            fun: {
                keydown: null,
                modelBlur: null, 
                changeText: null, 
                changeSwitch: null, 
                modelChange: null, 
                expressionBuilder: null 
            }
        }
        var data = {
            info: {
                html: '',
                timer: null,
                keydown: {
                    preCount: -1,
                    count: -1,
                    elem: null,
                    originParent: null,
                    originElem: null,
                }
            },
            fun: {
                init: null, 
                reset: null, 
                keydown: null 
            }
        }

        /**
         * @function [表达式构造功能函数] [Expression construction function function]
         */
        vm.data.fun.expressionBuilder = function(arg) {
            vm.data.info.expressionBuilderObject.request.constant = vm.model;
            $rootScope.ExpressionBuilderModal(vm.data.info.expressionBuilderObject, function(callback) {
                vm.model = callback.response.result || vm.model;
                vm.data.info.expressionBuilderObject = callback;
            });
        }
        /**
         * @function [input框信息改变触发功能函数] [Input box information change trigger function]
         */
        vm.data.fun.modelChange = function() {
            vm.data.info.view.isShow = true;
            vm.inputChangeFun();
            if (vm.model) {
                vm.data.info.array.filter = [];
                var template = {
                    count: 0
                }
                angular.forEach(vm.array, function(val, key) {
                    var pattern = '/^' + vm.model.toLowerCase() + '/';
                    try {
                        if (eval(pattern).test(val.toLowerCase())) {
                            vm.data.info.array.filter.splice(template.count, 0, val);
                            template.count++;
                        } else if (val.toLowerCase().indexOf(vm.model.toLowerCase()) > -1) {
                            vm.data.info.array.filter.push(val);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
                if (vm.data.info.array.filter.length <= 0) {
                    vm.data.info.view.isShow = false;
                }
            } else {
                vm.data.info.array.filter = vm.array;

            }
        }
        /**
         * @function [单击下拉按钮显示下拉菜单函数] [Click the drop-down button to display the drop-down menu function]
         */
        vm.data.fun.changeSwitch = function() {
            vm.data.info.view.isShow = !vm.data.info.view.isShow;
            if (vm.data.info.view.isShow) {
                vm.data.info.array.filter = vm.array;
            }
        }

        /**
         * @function [选中下拉框单项内容执行函数] [Select the single content execution function of the drop-down box]
         */
        vm.data.fun.changeText = function(info) {
            vm.model = info;
            vm.data.info.view.isShow = false;
            vm.inputChangeFun();
            data.fun.reset();
        }

        /**
         * @function [失去焦点执行函数] [Loss of focus execution function]
         */
        vm.data.fun.modelBlur = function(arg) {
            setTimeout(function() { //进行延时处理，时间单位为千分之一秒 Delay processing, the unit of time is 1/1000 seconds
                arg.focus.isFocus = false;
                $scope.$digest();
            }, 500)
            if (vm.mouseLeave) {
                vm.data.info.view.isShow = false;
                data.fun.reset();
            }
        }

        /**
         * @function [重置自动匹配指令] [Reset automatic matching instruction]
         */
        data.fun.reset = function() {
            data.info.keydown.originParent.scrollTop = 0;
            data.info.keydown.count = -1;
            if (data.info.keydown.elem) {
                data.info.keydown.elem.style.backgroundColor = null;
            }
            try {
                $scope.$digest();
            } catch (e) {}

        }

        vm.data.fun.focus = function($event) {
            vm.data.info.isFocus = true;
            if (!data.info.keydown.originParent) {
                vm.data.info.elem = $event.target;
                data.info.keydown.originParent = $event.target.nextElementSibling.nextElementSibling.nextElementSibling;
                data.info.keydown.originElem = $event.target.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
            }
        }

        /**
         * @function [键盘监听功能函数] [Keyboard monitor function]
         */
        vm.data.fun.keydown = function(_default) {
            switch (_default.keyCode) {
                case 38: // up
                case 40: // down
                    {
                        _default.preventDefault();
                        if (!vm.data.info.view.isShow) return;
                        var template = {
                            parent: data.info.keydown.originParent,
                            origin: data.info.keydown.originElem
                        };
                        data.info.keydown.preCount = data.info.keydown.count;
                        if (data.info.keydown.elem) {
                            data.info.keydown.elem.style.backgroundColor = null;
                        }
                        switch (_default.keyCode) {
                            case 38:
                                {
                                    if (data.info.keydown.count == -1 || data.info.keydown.count == 0) {
                                        data.info.keydown.count = template.origin.childElementCount - 1;
                                    } else {
                                        data.info.keydown.count--;
                                    }
                                    data.info.keydown.elem = angular.element(template.origin.children[data.info.keydown.count])[0];
                                    data.info.keydown.elem.style.backgroundColor = '#f5f5f5';
                                    if (data.info.keydown.count < data.info.keydown.preCount) {
                                        template.parent.scrollTop = (data.info.keydown.count - 4) * data.info.keydown.elem.offsetHeight;
                                    } else {
                                        template.parent.scrollTop = data.info.keydown.count * data.info.keydown.elem.offsetHeight;
                                    }
                                    return false;
                                    break;
                                }
                            case 40:
                                {
                                    if (data.info.keydown.count == (template.origin.childElementCount - 1)) {
                                        data.info.keydown.count = 0;
                                    } else {
                                        data.info.keydown.count++;
                                    }
                                    data.info.keydown.elem = angular.element(template.origin.children[data.info.keydown.count])[0];
                                    data.info.keydown.elem.style.backgroundColor = '#f5f5f5';
                                    if (data.info.keydown.count > 4) {
                                        template.parent.scrollTop = (data.info.keydown.count - 4) * data.info.keydown.elem.offsetHeight;
                                    } else if (data.info.keydown.count < data.info.keydown.preCount) {
                                        template.parent.scrollTop = 0;
                                    }
                                    return false;
                                    break;
                                }
                        }
                        break;
                    }
                case 13:
                    { //enter
                        _default.preventDefault();
                        if (data.info.keydown.elem) {
                            vm.data.fun.changeText(data.info.keydown.elem.innerText);
                        }
                        return false;
                        break;
                    }
            }
        }

    }
})();
