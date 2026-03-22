import _ from 'lodash-es';
import angular from 'angular';
import PortainerError from 'Portainer/error';
import { KubernetesCommonParams } from 'Kubernetes/models/common/params';
import { KubernetesIngressConverter } from './converter';

/* @ngInject */
export function KubernetesIngressService($async, KubernetesIngresses) {
  return {
    get,
    create,
    patch,
    delete: _delete,
  };

  async function getOne(namespace, name) {
    try {
      const params = new KubernetesCommonParams();
      params.id = name;
      const [raw, yaml] = await Promise.all([KubernetesIngresses(namespace).get(params).$promise, KubernetesIngresses(namespace).getYaml(params).$promise]);
      const res = {
        Raw: KubernetesIngressConverter.apiToModel(raw),
        Yaml: yaml.data,
      };
      return res;
    } catch (err) {
      throw new PortainerError('无法获取入口路由', err);
    }
  }

  async function getAll(namespace) {
    try {
      const data = await KubernetesIngresses(namespace).get().$promise;
      const res = _.reduce(data.items, (arr, item) => _.concat(arr, KubernetesIngressConverter.apiToModel(item)), []);
      return res;
    } catch (err) {
      throw new PortainerError('无法获取入口路由列表', err);
    }
  }

  function get(namespace, name) {
    if (name) {
      return $async(getOne, namespace, name);
    }
    return $async(getAll, namespace);
  }

  function create(ingress) {
    return $async(async () => {
      try {
        const params = {};
        const payload = KubernetesIngressConverter.createPayload(ingress);
        const namespace = payload.metadata.namespace;
        const data = await KubernetesIngresses(namespace).create(params, payload).$promise;
        return data;
      } catch (err) {
        throw new PortainerError('无法创建入口路由', err);
      }
    });
  }

  function patch(oldIngress, newIngress) {
    return $async(async () => {
      try {
        const params = new KubernetesCommonParams();
        params.id = newIngress.Name;
        const namespace = newIngress.Namespace;
        const payload = KubernetesIngressConverter.patchPayload(oldIngress, newIngress);
        if (!payload.length) {
          return;
        }
        const data = await KubernetesIngresses(namespace).patch(params, payload).$promise;
        return data;
      } catch (err) {
        throw new PortainerError('无法更新入口路由', err);
      }
    });
  }

  function _delete(namespace, ingressClassName) {
    return $async(async () => {
      try {
        const params = new KubernetesCommonParams();
        params.id = ingressClassName;
        await KubernetesIngresses(namespace).delete(params).$promise;
      } catch (err) {
        throw new PortainerError('无法删除入口路由', err);
      }
    });
  }
}

angular.module('portainer.kubernetes').service('KubernetesIngressService', KubernetesIngressService);
