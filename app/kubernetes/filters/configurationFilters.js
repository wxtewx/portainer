import { KubernetesConfigurationKinds } from 'Kubernetes/models/configuration/models';

angular.module('portainer.kubernetes').filter('kubernetesConfigurationKindText', function () {
  'use strict';
  return function (type) {
    switch (type) {
      case KubernetesConfigurationKinds.SECRET:
        return '密钥';
      case KubernetesConfigurationKinds.CONFIGMAP:
        return '配置映射';
    }
  };
});
