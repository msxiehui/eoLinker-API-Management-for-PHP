(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [项目文档相关js] [Project documents related js]
     * @version  3.1.6
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.doc', {
                    url: '/doc',
                    template: '<home-project-inside-doc power-object="$ctrl.data.info.powerObject"></home-project-inside-doc>'
                });
        }])
        .component('homeProjectInsideDoc', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/doc/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: indexController
        })

    indexController.$inject = [];

    function indexController() {
        var vm = this;
        vm.data = {
            info: {},
            fun: {
                init: null //初始化函数
            }
        }
    }
})();
