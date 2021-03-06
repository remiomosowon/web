﻿angular
    .module('bit.vault')

    .controller('vaultAddFolderController', function ($scope, apiService, $uibModalInstance, cryptoService, cipherService, $analytics) {
        $analytics.eventTrack('vaultAddFolderController', { category: 'Modal' });
        $scope.savePromise = null;
        $scope.save = function (model) {
            var folder = cipherService.encryptFolder(model);
            $scope.savePromise = apiService.folders.post(folder, function (response) {
                $analytics.eventTrack('Created Folder');
                var decFolder = cipherService.decryptFolder(response);
                $uibModalInstance.close(decFolder);
            }).$promise;
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('close');
        };
    });
