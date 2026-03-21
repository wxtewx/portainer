import { Form, useFormikContext } from 'formik';

import { ImageConfigFieldset } from '@@/ImageConfigFieldset';
import { LoadingButton } from '@@/buttons';

import { FormValues } from './types';

export function CreateImageForm({
  onRateLimit,
  isLoading,
}: {
  onRateLimit: (limited?: boolean) => void;
  isLoading: boolean;
}) {
  const { values, setFieldValue, errors, isValid } =
    useFormikContext<FormValues>();

  return (
    <Form className="form-horizontal">
      <div className="form-group">
        <div className="col-sm-12">
          <span className="small text-muted">
            你可以通过此容器创建镜像，用于备份重要数据或保存常用配置。之后你可以基于该镜像启动另一个容器。
          </span>
        </div>
      </div>

      <ImageConfigFieldset
        autoComplete
        values={values.config}
        setFieldValue={(field, value) =>
          setFieldValue(`config.${field}`, value)
        }
        errors={errors.config}
        onRateLimit={onRateLimit}
      />

      {/* Tag note */}
      <div className="form-group">
        <div className="col-sm-12">
          <span className="small text-muted">
            注意：若未在镜像名称中指定标签，将默认使用{' '}
            <span className="label label-default">latest</span> 标签。
          </span>
        </div>
      </div>

      <LoadingButton
        isLoading={isLoading}
        disabled={!isValid}
        loadingText="正在创建镜像..."
        data-cy="create-image-button"
      >
        创建
      </LoadingButton>
    </Form>
  );
}
