import { EndpointPortConfig } from 'docker-types';
import _ from 'lodash';

import { Values } from './PortsMappingField';
import { isRange } from './types';

export function toRequest(portBindings: Values): Array<EndpointPortConfig> {
  return _.compact(
    portBindings.flatMap((portBinding) => {
      const { hostPort, protocol, containerPort, publishMode } = portBinding;
      if (!hostPort && !containerPort) {
        return null;
      }

      if (isRange(hostPort) && isRange(containerPort)) {
        if (
          hostPort.end - hostPort.start !==
          containerPort.end - containerPort.start
        ) {
          throw new Error(
            `无效的端口配置：主机端口范围必须与容器端口范围大小一致`
          );
        }

        return Array.from(
          { length: hostPort.end - hostPort.start + 1 },
          (_, i) => ({
            PublishedPort: hostPort.start + i,
            Protocol: protocol,
            TargetPort: containerPort.start + i,
            PublishMode: publishMode,
          })
        );
      }

      if (isRange(hostPort) && !isRange(containerPort)) {
        return Array.from(
          { length: hostPort.end - hostPort.start + 1 },
          (_, i) => ({
            PublishedPort: hostPort.start + i,
            Protocol: protocol,
            TargetPort: containerPort,
            PublishMode: publishMode,
          })
        );
      }

      if (!isRange(hostPort) && !isRange(containerPort)) {
        return {
          PublishedPort: hostPort,
          Protocol: protocol,
          TargetPort: containerPort,
          PublishMode: publishMode,
        };
      }

      throw new Error(
        `无效的端口配置：当容器端口为范围时，主机端口也必须是范围`
      );
    })
  );
}
