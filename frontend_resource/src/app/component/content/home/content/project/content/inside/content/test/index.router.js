(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [自动化测试页路由及子路由] [Automated test page routing and sub-routing]
     * @version  3.1.7
     */
    angular.module('eolinker')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.test', {
                    url: '/test',
                    template: '<home-project-inside-test power-object="$ctrl.data.info.powerObject"></home-project-inside-test>'
                })
                .state('home.project.inside.test.default', {
                    url: '/default?groupID?childGroupID?search',
                    template: '<home-project-inside-test-default power-object="$ctrl.powerObject"></home-project-inside-test-default>'
                })
                .state('home.project.inside.test.api', {
                    url: '/api?groupID?childGroupID?caseID',
                    template: '<home-project-inside-test-api power-object="$ctrl.powerObject"></home-project-inside-test-api>'
                })
                .state('home.project.inside.test.edit', {
                    url: '/operateApi/:status?groupID?childGroupID?caseID?connID?orderNumber',
                    template: '<home-project-inside-test-edit-singal></home-project-inside-test-edit-singal>'
                });
        }])
})();