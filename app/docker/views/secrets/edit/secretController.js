import { ResourceControlType } from '@/react/portainer/access-control/types';

angular.module('portainer.docker').controller('SecretController', SecretController);

/* @ngInject */
function SecretController($scope, $transition$, $state, SecretService, Notifications, endpoint) {
  $scope.resourceType = ResourceControlType.Secret;
  $scope.endpoint = endpoint;
  $scope.onUpdateResourceControlSuccess = function () {
    $state.reload();
  };

  $scope.removeSecret = function removeSecret(secretId) {
    SecretService.remove(secretId)
      .then(function success() {
        Notifications.success('成功', '密钥删除成功');
        $state.go('docker.secrets', {});
      })
      .catch(function error(err) {
        Notifications.error('失败', err, '无法删除密钥');
      });
  };

  function initView() {
    SecretService.secret($transition$.params().id)
      .then(function success(data) {
        $scope.secret = data;
      })
      .catch(function error(err) {
        Notifications.error('失败', err, '无法获取密钥详情');
      });
  }

  initView();
}
