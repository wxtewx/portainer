import { ComponentProps } from 'react';

import { Alert } from '@@/Alert';
import { useDocsUrl } from '@@/PageHeader/ContextHelp';

import { EnvironmentVariablesFieldset } from './EnvironmentVariablesFieldset';
import { EnvironmentVariablesPanel } from './EnvironmentVariablesPanel';

type FieldsetProps = ComponentProps<typeof EnvironmentVariablesFieldset>;

export function StackEnvironmentVariablesPanel({
  onChange,
  values,
  errors,
  isFoldable = false,
  showHelpMessage,
}: {
  isFoldable?: boolean;
  showHelpMessage?: boolean;
} & FieldsetProps) {
  return (
    <EnvironmentVariablesPanel
      explanation={
        <div>
          你可以在{' '}
          <a
            href={`${useDocsUrl(
              '/user/docker/stacks/add#environment-variables'
            )}`}
            target="_blank"
            data-cy="stack-env-vars-help-link"
            rel="noreferrer noopener"
          >
            堆栈文件中使用环境变量
          </a>
          。下方设置的环境变量值将作为堆栈文件中的替换变量。请注意，你也可以在堆栈文件中引用 stack.env 文件。
          stack.env 文件包含环境变量及其值（例如：TAG=v1.5）。
        </div>
      }
      onChange={onChange}
      values={values}
      errors={errors}
      isFoldable={isFoldable}
      showHelpMessage={showHelpMessage}
      alertMessage={
        <div className="flex p-4">
          <Alert color="info" className="col-sm-12">
            <div>
              <p>
                <strong>stack.env 文件操作</strong>
              </p>
              <div>
                通过<strong>代码仓库</strong>部署时，stack.env 文件必须已存在于 Git 仓库中。
              </div>
              <div>
                通过<strong>网页编辑器</strong>,{' '}
                <strong>上传</strong> 或{' '}
                <strong>自定义模板部署</strong>时，stack.env 文件将根据你下方的设置自动创建。
              </div>
            </div>
          </Alert>
        </div>
      }
    />
  );
}
