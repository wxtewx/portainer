import { array, mixed, object, SchemaOf, string } from 'yup';

import { Values } from './PortsMappingField';

export function validationSchema(): SchemaOf<Values> {
  return array(
    object({
      hostPort: string().default(''),
      containerPort: string().required('容器端口不能为空'),
      protocol: mixed().oneOf(['tcp', 'udp']),
    })
  );
}
