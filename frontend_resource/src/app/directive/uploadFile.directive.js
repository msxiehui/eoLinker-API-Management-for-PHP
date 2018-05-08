(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [上传文件指令js] [Upload file instruction js]
     * @version  3.2.0
     */
    angular.module('eolinker.directive')

    .directive('uploadFileDirective', [function() {
        return {
            restrict: 'AE',
            template:'<input name="file" id="{{inputId}}" class="hidden" type="file" onChange="angular.element(this).scope().uploadFileDirective({arg:{$files:this.files}})" file-reset-directive button-function="change"/>',
            scope: {
                inputId:'@',
                uploadFileDirective: '&' //绑定设置回调函数
            },
            link: function($scope, elem, attrs, ctrl) {
                
            }
        };
    }]);
})();