import { processItemsInBatches } from '@/react/common/processItemsInBatches';

angular.module('portainer.docker').controller('SecretsController', [
  '$scope',
  '$state',
  'SecretService',
  'Notifications',
  function ($scope, $state, SecretService, Notifications) {
    $scope.removeAction = async function (selectedItems) {
      async function doRemove(secret) {
        return SecretService.remove(secret.Id)
          .then(function success() {
            Notifications.success('密钥删除成功', secret.Name);
            var index = $scope.secrets.indexOf(secret);
            $scope.secrets.splice(index, 1);
          })
          .catch(function error(err) {
            Notifications.error('失败', err, '无法删除密钥');
          });
      }

      await processItemsInBatches(selectedItems, doRemove);
      $state.reload();
    };

    $scope.getSecrets = getSecrets;

    function getSecrets() {
      SecretService.secrets()
        .then(function success(data) {
          $scope.secrets = data;
        })
        .catch(function error(err) {
          $scope.secrets = [];
          Notifications.error('失败', err, '无法获取密钥列表');
        });
    }

    function initView() {
      getSecrets();
    }

    initView();
  },
]);
