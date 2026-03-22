import { withLimitToBE } from '@/react/hooks/useLimitToBE';

import { InformationPanel } from '@@/InformationPanel';
import { TextTip } from '@@/Tip/TextTip';
import { PageHeader } from '@@/PageHeader';
import { Link } from '@@/Link';
import { Alert } from '@@/Alert';

import { Datatable } from './Datatable';
import { useLicenseOverused, useUntrustedCount } from './queries';

export default withLimitToBE(WaitingRoomView);

function WaitingRoomView() {
  const untrustedCount = useUntrustedCount();
  const licenseOverused = useLicenseOverused(untrustedCount);
  return (
    <>
      <PageHeader
        title="等待区"
        breadcrumbs={[{ label: '等待区' }]}
        reload
      />

      <div className="row">
        <div className="col-sm-12">
          <InformationPanel>
            <TextTip color="blue">
              仅通过{' '}
              <Link
                to="portainer.endpoints.edgeAutoCreateScript"
                data-cy="waitingRoom-edgeAutoCreateScriptLink"
              >
                自动部署
              </Link>{' '}
              脚本生成的环境会显示在此处，手动添加的环境和边缘设备将跳过等待区。
            </TextTip>
          </InformationPanel>
        </div>
      </div>

      {licenseOverused && (
        <div className="row">
          <div className="col-sm-12">
            <Alert color="warn">
              关联等待区中的所有节点将超出当前许可的节点限制。请前往{' '}
              <Link
                to="portainer.licenses"
                data-cy="waitingRoom-portainerLicensesLink"
              >
                许可管理
              </Link>{' '}
              页面查看当前使用情况。
            </Alert>
          </div>
        </div>
      )}

      <Datatable />
    </>
  );
}
