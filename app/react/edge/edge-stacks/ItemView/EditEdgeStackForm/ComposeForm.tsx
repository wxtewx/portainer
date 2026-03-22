import { useFormikContext } from 'formik';

import { useDockerComposeSchema } from '@/react/hooks/useDockerComposeSchema/useDockerComposeSchema';

import { TextTip } from '@@/Tip/TextTip';
import { WebEditorForm } from '@@/WebEditorForm';

import { DeploymentType } from '../../types';

import { FormValues } from './types';

export function ComposeForm({
  handleContentChange,
  hasKubeEndpoint,
  handleVersionChange,
  versionOptions,
}: {
  hasKubeEndpoint: boolean;
  handleContentChange: (type: DeploymentType, content: string) => void;
  handleVersionChange: (newVersion: number) => void;
  versionOptions: number[] | undefined;
}) {
  const { errors, values } = useFormikContext<FormValues>();
  const { data: dockerComposeSchema } = useDockerComposeSchema();

  return (
    <>
      {hasKubeEndpoint && (
        <TextTip>
          <p>
            Portainer 不再支持用于 Kubernetes 部署的{' '}
            <a
              href="https://docs.docker.com/compose/compose-file/"
              target="_blank"
              rel="noreferrer"
            >
              docker-compose
            </a>{' '}
            格式清单，我们已移除了支持该功能的{' '}
            <a href="https://kompose.io/" target="_blank" rel="noreferrer">
              Kompose
            </a>{' '}
            转换工具。原因是 Kompose 存在安全风险，因为它存在大量通用漏洞披露 (CVE) 问题。
          </p>
          <p>
            遗憾的是，尽管 Kompose 项目拥有维护者且属于 CNCF 项目，但它并未得到积极维护。版本发布非常不频繁，项目的新拉取请求 (包括我们提交的请求) 需要数月才能合并，与此同时新的漏洞不断出现。
          </p>
          <p>
            我们建议您在沙箱环境中安装自己的 Kompose 实例，将 Docker Compose 文件转换为 Kubernetes 清单，并使用这些清单来部署应用。
          </p>
        </TextTip>
      )}

      <WebEditorForm
        data-cy="compose-editor"
        value={values.content}
        type="yaml"
        schema={dockerComposeSchema}
        id="compose-editor"
        textTip="在此定义或粘贴您的 docker compose 文件内容"
        onChange={(value) => handleContentChange(DeploymentType.Compose, value)}
        error={errors.content}
        readonly={hasKubeEndpoint}
        versions={versionOptions}
        onVersionChange={handleVersionChange}
      >
        <div>
          您可以在{' '}
          <a
            href="https://docs.docker.com/compose/compose-file/"
            target="_blank"
            rel="noreferrer"
          >
            官方文档
          </a>
          中获取更多关于 Compose 文件格式的信息。
        </div>
      </WebEditorForm>
    </>
  );
}
