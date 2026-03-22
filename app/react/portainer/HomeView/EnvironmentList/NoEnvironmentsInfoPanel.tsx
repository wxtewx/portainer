import { InformationPanel } from '@@/InformationPanel';
import { Link } from '@@/Link';
import { TextTip } from '@@/Tip/TextTip';

export function NoEnvironmentsInfoPanel({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <InformationPanel title="提示">
          <TextTip>
            {isAdmin ? (
              <span>
                暂无可管理的环境。请前往{' '}
                <Link
                  to="portainer.wizard.endpoints"
                  data-cy="wizard-add-environments-link"
                >
                  环境添加向导
                </Link>{' '}
                添加环境。
              </span>
            ) : (
              <span>
                你暂无任何环境的访问权限，请联系管理员。
              </span>
            )}
          </TextTip>
        </InformationPanel>
      </div>
    </div>
  );
}
