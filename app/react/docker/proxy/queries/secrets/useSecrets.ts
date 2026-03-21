import axios, { parseAxiosError } from '@/portainer/services/axios';
import { EnvironmentId } from '@/react/portainer/environments/types';

import { buildDockerProxyUrl } from '../buildDockerProxyUrl';

export async function getSecrets(environmentId: EnvironmentId) {
  try {
    const { data } = await axios.get(
      buildDockerProxyUrl(environmentId, 'secrets')
    );
    return data;
  } catch (err) {
    throw parseAxiosError(err, '无法获取密钥列表');
  }
}
