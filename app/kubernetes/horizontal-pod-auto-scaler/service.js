import angular from 'angular';
import _ from 'lodash-es';
import PortainerError from 'Portainer/error';
import { KubernetesCommonParams } from 'Kubernetes/models/common/params';
import { KubernetesHorizontalPodAutoScalerConverter } from './converter';

class KubernetesHorizontalPodAutoScalerService {
  /* @ngInject */
  constructor($async, KubernetesHorizontalPodAutoScalers) {
    this.$async = $async;
    this.KubernetesHorizontalPodAutoScalers = KubernetesHorizontalPodAutoScalers;

    this.getAsync = this.getAsync.bind(this);
    this.getAllAsync = this.getAllAsync.bind(this);
    this.createAsync = this.createAsync.bind(this);
    this.patchAsync = this.patchAsync.bind(this);
    // this.rollbackAsync = this.rollbackAsync.bind(this);
    this.deleteAsync = this.deleteAsync.bind(this);
  }

  /**
   * GET
   */
  async getAsync(namespace, name) {
    try {
      const params = new KubernetesCommonParams();
      params.id = name;
      const [raw, yaml] = await Promise.all([
        this.KubernetesHorizontalPodAutoScalers(namespace).get(params).$promise,
        this.KubernetesHorizontalPodAutoScalers(namespace).getYaml(params).$promise,
      ]);
      const res = KubernetesHorizontalPodAutoScalerConverter.apiToModel(raw, yaml);
      return res;
    } catch (err) {
      throw new PortainerError('无法获取 Pod 自动扩缩容器', err);
    }
  }

  async getAllAsync(namespace) {
    try {
      const data = await this.KubernetesHorizontalPodAutoScalers(namespace).get().$promise;
      const res = _.map(data.items, (item) => KubernetesHorizontalPodAutoScalerConverter.apiToModel(item));
      return res;
    } catch (err) {
      throw new PortainerError('无法获取 Pod 自动扩缩容器列表', err);
    }
  }

  get(namespace, name) {
    if (name) {
      return this.$async(this.getAsync, namespace, name);
    }
    return this.$async(this.getAllAsync, namespace);
  }

  /**
   * CREATE
   */
  async createAsync(horizontalPodAutoScaler) {
    try {
      const params = {};
      const payload = KubernetesHorizontalPodAutoScalerConverter.createPayload(horizontalPodAutoScaler);
      const namespace = payload.metadata.namespace;
      const data = await this.KubernetesHorizontalPodAutoScalers(namespace).create(params, payload).$promise;
      return data;
    } catch (err) {
      throw new PortainerError('无法创建 Pod 自动扩缩容器', err);
    }
  }

  create(horizontalPodAutoScaler) {
    return this.$async(this.createAsync, horizontalPodAutoScaler);
  }

  /**
   * PATCH
   */
  async patchAsync(oldHorizontalPodAutoScaler, newHorizontalPodAutoScaler) {
    try {
      const params = new KubernetesCommonParams();
      params.id = newHorizontalPodAutoScaler.Name;
      const namespace = newHorizontalPodAutoScaler.Namespace;
      const payload = KubernetesHorizontalPodAutoScalerConverter.patchPayload(oldHorizontalPodAutoScaler, newHorizontalPodAutoScaler);
      if (!payload.length) {
        return;
      }
      const data = await this.KubernetesHorizontalPodAutoScalers(namespace).patch(params, payload).$promise;
      return data;
    } catch (err) {
      throw new PortainerError('无法更新 Pod 自动扩缩容器', err);
    }
  }

  patch(oldHorizontalPodAutoScaler, newHorizontalPodAutoScaler) {
    return this.$async(this.patchAsync, oldHorizontalPodAutoScaler, newHorizontalPodAutoScaler);
  }

  /**
   * DELETE
   */
  async deleteAsync(horizontalPodAutoScaler) {
    try {
      const params = new KubernetesCommonParams();
      params.id = horizontalPodAutoScaler.Name;
      const namespace = horizontalPodAutoScaler.Namespace;
      await this.KubernetesHorizontalPodAutoScalers(namespace).delete(params).$promise;
    } catch (err) {
      throw new PortainerError('无法删除 Pod 自动扩缩容器', err);
    }
  }

  delete(horizontalPodAutoScaler) {
    return this.$async(this.deleteAsync, horizontalPodAutoScaler);
  }
}

export default KubernetesHorizontalPodAutoScalerService;
angular.module('portainer.kubernetes').service('KubernetesHorizontalPodAutoScalerService', KubernetesHorizontalPodAutoScalerService);
