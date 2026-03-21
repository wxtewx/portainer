import { addPlural } from '@/react/common/string-utils';

interface SelectedRowsCountProps {
  value: number;
  hidden: number;
}

export function SelectedRowsCount({ value, hidden }: SelectedRowsCountProps) {
  return value !== 0 ? (
    <div className="infoBar">
      已选择 {addPlural(value, '项')}
      {hidden !== 0 && ` (${hidden} 项被过滤器隐藏)`}
    </div>
  ) : null;
}
