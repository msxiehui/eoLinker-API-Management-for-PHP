(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [api详情相关服务js] [api details related services js]
     * @version  3.0.2
     */
    angular.module('eolinker')
        .factory('HomeProject_Common_Service', index);

    index.$inject = ['$rootScope']

    function index($rootScope) {
        var data = {
            apiTestObject: {
                testInfo: null,
                fun: {
                    set: null,
                    clear: null
                }
            },
            envObject: {
                object: {
                    model: {},
                    param: [],
                    fun: null
                },
                query: null,
                fun: {
                    resetObject: null, 
                    clear: null, 
                }
            },
            overviewObject:{//项目概况页相关类
                fun:{
                    autoGeneration:null
                }
            }
        }

        /**
         * @function [缓存测试数据功能函数] [Cache test data]
         * @param    {[arg]}   arg [数据 data]
         */
        data.apiTestObject.fun.set = function(arg) {
            var template = {
                object: {}
            }
            angular.copy(arg.object, template.object);
            data.apiTestObject.testInfo = template.object;
        }

        /**
         * @function [清空测试数据功能函数] [Empty test data]
         */
        data.apiTestObject.fun.clear = function() {
            data.apiTestObject.testInfo = null;
        }

        /**
         * @function [重置变量双向绑定数据功能函数] [Reset variable bidirectional binding data function function]
         * @param    {[obj]}   arg [重置内容 Reset the content]
         */
        data.envObject.fun.resetObject = function() {
            data.envObject.object = {
                model: {},
                param: [],
                fun: null
            };
        }

        /**
         * @function [清缓存功能函数] [Clear cache]
         */
        data.envObject.fun.clear = function() {
            data.envObject.query = null;
        }
        /**
         * @description 自动生成文档
         * @param arg {[object]} {传参对象}
         * @param arg.projectID {[string]} {项目标识}
         * 
         */
        data.overviewObject.fun.autoGeneration=function(arg){
            var template={
                modal:{
                    projectID:arg.projectID,
                    importURL:arg.importURL
                }
            }
            $rootScope.ApiManagement_AutoGenerationModal(template.modal);
        }
        return data;
    }
})();
