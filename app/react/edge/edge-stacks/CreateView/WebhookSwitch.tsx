import { TextTip } from '@@/Tip/TextTip';
import { SwitchField } from '@@/form-components/SwitchField';

export function WebhookSwitch({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div>
      <div className="form-section-title"> Webhooks </div>
      <SwitchField
        label="创建边缘堆栈 Webhook"
        checked={value}
        onChange={onChange}
        tooltip="创建 Webhook (或回调 URI) 以自动更新此堆栈。向此回调 URI 发送 POST 请求 (无需任何身份验证) 将拉取相关镜像的最新版本并重新部署此堆栈。"
        labelClass="col-sm-3 col-lg-2"
        data-cy="webhook-switch"
      />

      {value && (
        <TextTip>
          向 Webhook 发送环境变量将使用新值更新堆栈。新的变量名将被添加到堆栈中，现有变量将被更新。
        </TextTip>
      )}
    </div>
  );
}
