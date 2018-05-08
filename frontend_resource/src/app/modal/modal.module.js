(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [所有弹窗模块定义js] [All pop-up modules define js]
     * @version  3.0.2
     * @service  ui.bootstrap.modal [注入第三方bootstrap modal插件] [Inject a third party bootstrap modal plugin]
     */
    angular.module('eolinker.modal', ['ui.bootstrap.modal'])

    .directive('eoModal', [function() {
        return {
            restrict: 'AE',
            template: '<eo-common-modal></eo-common-modal>' +
                    '<eo-api-management-modal></eo-api-management-modal>',
            controller: eoModalController
        }
    }])
    eoModalController.$inject = ['$scope', '$uibModal', '$rootScope']

    function eoModalController($scope, $uibModal, $rootScope) {
         /**
         * @description 接口管理公用模块定义
         */
        $rootScope.ApiManagement_AutomatedTest_QiuckAddSingalModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiManagement_AutomatedTest_QiuckAddSingalModal',
                controller: 'ApiManagement_AutomatedTest_QiuckAddSingalModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ApiManagement_AutomatedTest_EditCaseModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiManagement_AutomatedTest_EditCaseModal',
                controller: 'ApiManagement_AutomatedTest_EditCaseModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ApiManagement_AutomatedTest_BindModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiManagement_AutomatedTest_BindModal',
                controller: 'ApiManagement_AutomatedTest_BindModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.RequestParamDetailModal = function openModal(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'RequestParamDetailModal',
                controller: 'RequestParamDetailModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.RequestParamEditModal = function openModal(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'RequestParamEditModal',
                controller: 'RequestParamEditModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ResponseParamEditModal = function openModal(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ResponseParamEditModal',
                controller: 'ResponseParamEditModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ResponseParamDetailModal = function openModal(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ResponseParamDetailModal',
                controller: 'ResponseParamDetailModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ExpressionBuilderModal = function openModel(data, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ExpressionBuilderModal',
                controller: 'ExpressionBuilderModalCtrl',
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.InfoModal = function openModel(info, type, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'InfoModal',
                controller: 'InfoModalCtrl',
                resolve: {
                    info: function() {
                        return info;
                    },
                    type: function() {
                        return type;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.TipsModal = function openModel(info, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'TipsModal',
                controller: 'TipsModalCtrl',
                resolve: {
                    info: function() {
                        return info;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.JsonToParamInputModal = function openModel(input,callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'JsonToParamInputModal',
                controller: 'JsonToParamInputModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ImportDatabaseModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ImportDatabaseModal',
                controller: 'ImportDatabaseModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.EnsureModal = function openModel(title, necessity, info, btn, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'EnsureModal',
                controller: 'EnsureModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    necessity: function() {
                        return necessity;
                    },
                    info: function() {
                        return info;
                    },
                    btn: function() {
                        return btn;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.MessageModal = function openModel(title, info, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'MessageModal',
                controller: 'MessageModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    info: function() {
                        return info;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.DatabaseModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'DatabaseModal',
                controller: 'DatabaseModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.FieldModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'FieldModal',
                controller: 'FieldModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.TableModal = function openModel(title, info, databaseID, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'TableModal',
                controller: 'TableModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    info: function() {
                        return info;
                    },
                    databaseID: function() {
                        return databaseID;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.GroupModal = function openModel(title, info, secondTitle, query, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'GroupModal',
                controller: 'GroupModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    info: function() {
                        return info;
                    },
                    secondTitle: function() {
                        return secondTitle;
                    },
                    query: function() {
                        return query;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ApiRecoverModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiRecoverModal',
                controller: 'ApiRecoverModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ImportModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ImportModal',
                controller: 'ImportModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ProjectModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ProjectModal',
                controller: 'ProjectModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ExportModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ExportModal',
                controller: 'ExportModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ExportDatabaseModal = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ExportDatabaseModal',
                controller: 'ExportDatabaseModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.CodeModal = function openModel(title, info, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'CodeModal',
                controller: 'CodeModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    info: function() {
                        return info;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.UpdateModal = function openModel(title, info, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'UpdateModal',
                controller: 'UpdateModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    info: function() {
                        return info;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.CommonSingleInputModal = function openModel(title, desc, info, input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'CommonSingleInputModal',
                controller: 'CommonSingleInputModalCtrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    desc: function() {
                        return desc;
                    },
                    info: function() {
                        return info;
                    },
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ApiManagement_AutoGenerationModal = function(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiManagement_AutoGenerationModal',
                controller: 'ApiManagement_AutoGenerationModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.ApiManagement_BackupsModal = function(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApiManagement_BackupsModal',
                controller: 'ApiManagement_BackupsModalCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
        $rootScope.Common_UploadFile = function openModel(input, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Common_UploadFile',
                controller: 'Common_UploadFileCtrl',
                resolve: {
                    input: function() {
                        return input;
                    }
                }
            });
            modalInstance.result.then(callback);
        }
    }

})();
